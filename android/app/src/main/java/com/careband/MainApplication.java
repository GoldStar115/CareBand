package com.careband;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.amazonaws.amplify.pushnotification.RNPushNotificationPackage;
import com.github.xinthink.rnmk.ReactMaterialKitPackage;
import com.amazonaws.RNAWSCognitoPackage;
import com.airlabsinc.RNAWSCognitoPackage;
import com.horcrux.svg.SvgPackage;
import com.peel.react.TcpSocketsModule;
import com.imagepicker.ImagePickerPackage;
import org.reactnative.camera.RNCameraPackage;
import com.reactnativenavigation.NavigationReactPackage;
import com.wix.autogrowtextinput.AutoGrowTextInputPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

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
            new RNFetchBlobPackage(),
            new RNFetchBlobPackage(),
            new RNPushNotificationPackage(),
            new ReactMaterialKitPackage(),
            new RNAWSCognitoPackage(),
            new RNAWSCognitoPackage(),
            new SvgPackage(),
            new TcpSocketsModule(),
            new ImagePickerPackage(),
            new RNCameraPackage(),
            new NavigationReactPackage(),
            new AutoGrowTextInputPackage(),
            new VectorIconsPackage(),
            new MapsPackage()
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
  }
}
