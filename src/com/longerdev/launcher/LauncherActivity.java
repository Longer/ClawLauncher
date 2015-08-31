package com.longerdev.launcher;

import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebView;
import android.webkit.WebSettings;
import android.graphics.Color;
import android.view.View;

import com.longerdev.launcher.MyJavaScriptInterface;

public class LauncherActivity extends Activity{
	/** Called when the activity is first created. */
	@Override
	public void onCreate(Bundle savedInstanceState){
		super.onCreate(savedInstanceState);
		setContentView(R.layout.main);

		WebView mainWebView = (WebView) findViewById(R.id.webview);
		WebSettings webSettings = mainWebView.getSettings();

		webSettings.setJavaScriptEnabled(true);
		webSettings.setAllowFileAccessFromFileURLs(true);
		webSettings.setAllowUniversalAccessFromFileURLs(true);

		mainWebView.setBackgroundColor(Color.TRANSPARENT);
		mainWebView.setLayerType(WebView.LAYER_TYPE_SOFTWARE, null);
		mainWebView.setScrollBarStyle(View.SCROLLBARS_INSIDE_OVERLAY);

		MyJavaScriptInterface myInterface = new MyJavaScriptInterface(mainWebView, LauncherActivity.this);
		mainWebView.addJavascriptInterface(myInterface, "AndroidAPI");

		//mainWebView.loadUrl("http://192.168.0.20:8000/");
		mainWebView.loadUrl("file:///android_asset/www/index.html");
	}

	@Override
	public void onBackPressed(){

	}
}
