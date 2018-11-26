package com.jkb.transmison;


import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.jkb.transmison.TransMissonMoudle;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * 作者:ZPengs on 18/3/5
 */
public class TransMissonPackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new TransMissonMoudle(reactContext));//摇一摇

        return  modules;
    }

//    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        List<ViewManager> viewManagerList=new ArrayList<>();
//        viewManagerList.add(new PTRRefreshManager());
        return viewManagerList;

    }
}
