package com.longerdev.launcher;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.FileOutputStream;

import android.app.Activity;
import android.os.Bundle;
import android.os.Environment;
import android.content.pm.ApplicationInfo;
import android.webkit.WebView;
import android.webkit.WebSettings;
import android.graphics.Color;
import android.view.View;
import android.view.View.OnLongClickListener;
import android.util.Log;

import com.longerdev.launcher.MyJavaScriptInterface;
import com.longerdev.launcher.Constants;

public class LauncherActivity extends Activity{
	private boolean isDebuggable;
	private WebView mainWebView;

	/** Called when the activity is first created. */
	@Override
	public void onCreate(Bundle savedInstanceState){
		super.onCreate(savedInstanceState);
		setContentView(R.layout.main);

		isDebuggable = (0 != (getApplicationInfo().flags & ApplicationInfo.FLAG_DEBUGGABLE));

		createConfig();

		mainWebView = (WebView) findViewById(R.id.webview);
		WebSettings webSettings = mainWebView.getSettings();

		webSettings.setJavaScriptEnabled(true);
		webSettings.setAllowFileAccessFromFileURLs(true);
		webSettings.setAllowUniversalAccessFromFileURLs(true);

		mainWebView.setLongClickable(true);
		mainWebView.setOnLongClickListener(new OnLongClickListener(){
			@Override
			public boolean onLongClick(View v){
				return true;
			}
		});
		mainWebView.setBackgroundColor(Color.TRANSPARENT);
		mainWebView.setLayerType(WebView.LAYER_TYPE_SOFTWARE, null);
		mainWebView.setScrollBarStyle(View.SCROLLBARS_INSIDE_OVERLAY);

		MyJavaScriptInterface myInterface = new MyJavaScriptInterface(mainWebView, LauncherActivity.this, isDebuggable);
		mainWebView.addJavascriptInterface(myInterface, "AndroidAPI");

		//mainWebView.loadUrl("http://192.168.0.20:8000/");
		mainWebView.loadUrl("file:///android_asset/www/index.html");
	}

	@Override
	public void onBackPressed(){
		mainWebView.loadUrl("javascript:backPressed()");
	}

	private void createConfig(){
		File file;

		if (isDebuggable && Environment.getExternalStorageState().equals(Environment.MEDIA_MOUNTED)){
			File path = Environment.getExternalStorageDirectory();
			path = new File(path.getAbsolutePath() + "/ClawLauncher/");
			path.mkdirs();

			file = new File(path, Constants.CONFIG_FILE);
		}
		else{
			file = getFileStreamPath(Constants.CONFIG_FILE);
		}

		if (!file.exists()){
			try{
				InputStream in = getResources().openRawResource(R.raw.config);
				OutputStream out = new FileOutputStream(file);
				byte[] buf = new byte[1024];
				int len;
				while ((len = in.read(buf)) > 0) {
					out.write(buf, 0, len);
				}
				in.close();
				out.close();
			}
			catch (FileNotFoundException e){

			}
			catch (IOException e) {

			}
		}
	}
}
