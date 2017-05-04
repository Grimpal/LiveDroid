package org.tfg.livedroid;

import android.content.Context;
import android.os.AsyncTask;
import android.os.Build;
import android.os.SystemClock;
import android.util.Log;

import java.io.File;
import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.net.InterfaceAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.util.Enumeration;
import java.util.List;
import java.util.Properties;
import javax.net.ssl.KeyManagerFactory;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.security.KeyStore;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.UnrecoverableKeyException;
import java.security.cert.CertificateException;

public class DroidServer extends NanoHTTPD
{
    String [] activeNodes;

    static final String TAG="LiveDroid";
    private boolean udp_active = false;
    private String data= "";

    public DroidServer(int port, Context ctx) throws IOException {
        super(port, ctx.getAssets());
    }

    public DroidServer(int port, String wwwroot) throws IOException {
        super(port, new File(wwwroot).getAbsoluteFile());
    }

    @Override
    public Response serve( String uri, String method, Properties header, Properties parms, Properties files ){
        Log.d(TAG, "httpd request >>" + method + " '" + uri + "' " + "   " + parms);

        //uri.startsWith("/cgi/") )
        if(uri.startsWith("/dameIP/") ){

                    if(udp_active){

                        data = "Servicio Deshabilitado, habilita la búsqueda UDP";

                    }

                    else {

                        try {

                            //Algunas variables

                            data = "";

                            //Socket
                            DatagramSocket s = new DatagramSocket(null);
                            s.setReuseAddress(true);
                            s.setBroadcast(true);
                            s.bind(new InetSocketAddress(8889));

                            //Para Broadcast UDP
                            DatagramPacket p;
                            String msg = "ARE YOU ALIVE?";
                            byte[] sMsg = msg.getBytes();


                            //Para Recibir respuestas UDP
                            byte[] receiveBuffer = new byte[15000];
                            DatagramPacket broadcastResponse = new DatagramPacket(receiveBuffer, receiveBuffer.length);


                            //Enviamos Broadcast UDP
                            p = new DatagramPacket(sMsg, sMsg.length, InetAddress.getByName("192.168.2.255"), 8889);
                            s.send(p);
                            Log.d(TAG, "Broadcast UDP enviado");

                            //Empezamos a escuchar las respuestas

                            String receivedData;
                            long StartTime = System.currentTimeMillis();

                            while( (System.currentTimeMillis() - StartTime) < 10000 ){ //Diferencia de 5 segundos

                                s.receive(broadcastResponse);
                                receivedData = new String(broadcastResponse.getData(), 0, broadcastResponse.getLength());
                                data += "Server asks! " + msg + " | " + receivedData + " " + broadcastResponse.getAddress() + " | ";

                            }

                            /*s.receive(broadcastResponse);
                            receivedData = new String(broadcastResponse.getData(), 0, broadcastResponse.getLength());
                            data += "Server asks! " + msg + " | " + receivedData + " " + broadcastResponse.getAddress() + " | ";

                            s.receive(broadcastResponse);
                            receivedData = new String(broadcastResponse.getData(), 0, broadcastResponse.getLength());
                            data += "Server asks! " + msg + " | " + receivedData + " " + broadcastResponse.getAddress() + " | ";*/

                        } catch (Exception e) {

                            Log.d(TAG, e.getMessage());
                            data += " | " + e.getMessage() + " | " + e.getLocalizedMessage();
                        }
                    }

            Response r = new DroidServer.Response(HTTP_OK,MIME_PLAINTEXT,data);
            r.addHeader("Access-Control-Allow-Origin", "*");
            r.addHeader("Access-Control-Max-Age", "3628800");
            r.addHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
            r.addHeader("Access-Control-Allow-Headers", "X-Requested-With");

            return r;
        }

        return super.serve(uri, method, header, parms, files);

    }

    public void stopUDP(){

        udp_active = false;

    }

    public void startUDP(){

        udp_active = true;
    }

    public boolean getUDPStat(){

        return udp_active;
    }


    @Override
    public void serveDone(Response r) {
        try{
            if ( r.isStreaming ) {
                r.data.close();
            }
        } catch(IOException ex) {
        }
    }

}