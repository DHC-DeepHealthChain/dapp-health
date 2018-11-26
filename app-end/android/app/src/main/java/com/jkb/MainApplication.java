package com.jkb;

import android.app.Application;

import com.facebook.react.ReactApplication;
import org.devio.rn.splashscreen.SplashScreenReactPackage;

import com.jkb.transmison.TransMissonPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

import android.app.Notification;
import android.content.Context;
import android.os.Handler;
import android.widget.RemoteViews;
import android.widget.Toast;
import com.umeng.commonsdk.UMConfigure;
import com.umeng.socialize.PlatformConfig;
import com.umeng.socialize.Config;
import com.jkb.invokenative.DplusReactPackage;
import com.jkb.invokenative.RNUMConfigure;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new SplashScreenReactPackage(),
            new PickerPackage(),
            new DplusReactPackage(),
            new TransMissonPackage()//切记这里别忘记使用
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    // 此处配置类型，供后台分析各渠道时使用
    Config.shareType = "react native";
    RNUMConfigure.init(this, "5adecca1f43e4825610000e8", "Umeng", UMConfigure.DEVICE_TYPE_PHONE, "669c30a9584623e70e8cd01b0381dcb4");
  }

  {
    PlatformConfig.setWeixin("wxbf057113704253d3", "483ca4e3e476e9b2a38c287995654c48");
    PlatformConfig.setQQZone("1106801511", "VnKODc9GvNAnwbj9");
    PlatformConfig.setSinaWeibo("3676785918", "8850e041ba09ec9ba1ebb85933d96cae", "http://sns.whalecloud.com");
  }
}
