package com.longerdev.launcher;

import java.util.List;
import java.util.ArrayList;
import java.io.ByteArrayOutputStream;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.InputStream;
import org.json.JSONArray;
import org.json.JSONObject;
import android.content.Context;
import android.content.Intent;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.content.pm.PackageManager.NameNotFoundException;
import android.graphics.drawable.Drawable;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.Bitmap;
import android.util.Base64;

public class MyJavaScriptInterface{
	private WebView webView;
	private Context context;
	private PackageManager pm;

	public MyJavaScriptInterface(WebView currentWebView, Context currentContext){
		webView = currentWebView;
		context = currentContext;
		pm = context.getPackageManager();
	}

	@JavascriptInterface
	public String apps() throws Exception{
		JSONArray apps = new JSONArray();
		JSONObject tmp;

		Intent i = new Intent(Intent.ACTION_MAIN, null);
		i.addCategory(Intent.CATEGORY_LAUNCHER);

		List<ResolveInfo> availableActivities = pm.queryIntentActivities(i, 0);
		for (ResolveInfo ri:availableActivities){
			/*AppDetail app = new AppDetail();
			app.label = ri.loadLabel(pm);
			app.name = ri.activityInfo.packageName;
			app.icon = ri.activityInfo.loadIcon(pm);
			apps.add(app);*/
			Bitmap map1 = ((BitmapDrawable) ri.activityInfo.loadIcon(pm)).getBitmap();
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			map1.compress(Bitmap.CompressFormat.PNG, 100, baos);
			byte[] b = baos.toByteArray();
			String imgToString = Base64.encodeToString(b, Base64.DEFAULT);

			tmp = new JSONObject();
			tmp.put("label", ri.loadLabel(pm));
			tmp.put("name", ri.activityInfo.packageName);
			tmp.put("icon", "data:image/png;base64,"+imgToString);
			apps.put(tmp);
		}

		return apps.toString();
	}

	@JavascriptInterface
	public String exec(String name) throws Exception{
		Intent i = pm.getLaunchIntentForPackage(name);
		context.startActivity(i);
		return "";
	}

	@JavascriptInterface
	public String getIcon(String name) throws Exception{
			Drawable icon;
			try{
				icon = pm.getApplicationIcon(name);
			}
			catch (NameNotFoundException e){
				icon = pm.getDefaultActivityIcon();
			}

			Bitmap map1 = ((BitmapDrawable) icon).getBitmap();
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			map1.compress(Bitmap.CompressFormat.PNG, 100, baos);
			byte[] b = baos.toByteArray();
			String imgToString = Base64.encodeToString(b, Base64.DEFAULT);

			return "data:image/png;base64,"+imgToString;
	}

	@JavascriptInterface
	public String getConfig() throws Exception{
		String ret = "";

		try{
			//InputStream inputStream = context.openFileInput("config.json");
			InputStream inputStream = context.getResources().openRawResource(R.raw.config);

			if (inputStream != null){
				InputStreamReader inputStreamReader = new InputStreamReader(inputStream);
				BufferedReader bufferedReader = new BufferedReader(inputStreamReader);
				String receiveString = "";
				StringBuilder stringBuilder = new StringBuilder();

				while ((receiveString = bufferedReader.readLine()) != null){
					stringBuilder.append(receiveString);
				}

				inputStream.close();
				ret = stringBuilder.toString();
			}
		}
		catch (Exception e){

		}

		return ret;
	}
}
