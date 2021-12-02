import { JsonObject } from '@angular-devkit/core';
import { Injectable } from '@angular/core';
import { Auth, authState, GoogleAuthProvider, signInWithPopup, signOut } from '@angular/fire/auth';
import { NGXLogger } from 'ngx-logger';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
    
    constructor(private auth: Auth, private logger: NGXLogger) {}

    private cookie: string = 'cookbook-session'; 

    isLoggedIn(){
      if(!this.getCookie(this.cookie)){
        this.logger.info('isLoggedIn()  ' + false);
        return false;
      }else{
        this.logger.info('isLoggedIn()  ' + true);
        return true;
      }
    }

    setSession(auth: Auth) {
        const userJson = auth.currentUser?.toJSON();
        const userString = JSON.stringify(userJson);
        sessionStorage.setItem('user', userString);
    }

    getSession(): any{
        const userString =  sessionStorage.getItem('user');
        if(userString){
            const userJson = JSON.parse(userString); 
            return userJson;
            
        }else{
            this.logger.error('user not found in session storage');
            return false;
        }
    }

    deleteSession(){
      sessionStorage.clear();
      this.logger.info("deleteSession() session storage cleared");
    }

    private user: User;
    setUser(val: string){
      let jsonObject: any = JSON.parse(val);
      this.user = <User>jsonObject;
      this.logger.info("setUser() " + this.user.displayName);
    }

    getUser():User{
      return this.user;
    }

    deleteUser(){
      //tbd
    }

    async logout(){
      await signOut(this.auth);
      this.logger.info("logout() user is logged out");
      this.deleteSession();
      this.deleteCookie(this.cookie);
    }

    async login() {
        const provider = new GoogleAuthProvider();
        this.auth.languageCode = 'de';
        this.logger.info('login() start sign in with popup ' + provider.providerId);
  
        await signInWithPopup(this.auth, provider)
        .then(result => {
          const token = GoogleAuthProvider.credentialFromResult(result)?.accessToken;
          this.logger.info('login()  token: ' +  token);
        })
        .catch((error) => {
          this.logger.error('errorCode: ' +  error.code);
          this.logger.error('errorMessage: ' +  error.message);
          this.logger.error('email: ' +  error.email);
          this.logger.error('credential: ' +  GoogleAuthProvider.credentialFromError(error));
        });;
  
        const userJson = this.auth.currentUser?.toJSON();
        const user = JSON.stringify(userJson);

        this.setUser(user);
        this.setSession(this.auth);
        this.setCookie(
          {
            name: this.cookie,
            value: user,
            expireMinutes:30
          });
      }


      public getCookie(name: string) {
        let ca: Array<string> = document.cookie.split(';');
        let caLen: number = ca.length;
        let cookieName = `${name}=`;
        let c: string;
    
        for (let i: number = 0; i < caLen; i += 1) {
          c = ca[i].replace(/^\s+/g, '');
          if (c.indexOf(cookieName) == 0) {
            const val = c.substring(cookieName.length, c.length);
            this.logger.info('getCookie() ' + name);
            return val
          }
        }
        return '';
      }
    
      public deleteCookie(cookieName: any) {
        this.setCookie({name: cookieName,value:'',expireMinutes:-1});
        this.logger.info("deleteCookie() cookie delete with name " + this.cookie);
      }
    
     /**
       * Expires default 1 day 
       * If params.session is set and true expires is not added
       * If params.path is not set or value is not greater than 0 its default value will be root "/"
       * Secure flag can be activated only with https implemented
       * Examples of usage:
       * {service instance}.setCookie({name:'token',value:'abcd12345', session:true }); <- This cookie will not expire
       * {service instance}.setCookie({name:'userName',value:'John Doe', secure:true }); <- If page is not https then secure will not apply
       * {service instance}.setCookie({name:'niceCar', value:'red', expireMinutes:30 }); <- For all this examples if path is not provided default will be root
       */
      public setCookie(params:any) 
      {
        let d: Date = new Date();
        d.setTime(d.getTime() + (params.expireMinutes ? params.expireMinutes:1) * 60 * 1000); 
        document.cookie = 
            (params.name? params.name:'') + "=" + (params.value?params.value:'') + ";"
            + (params.session && params.session == true ? "" : "expires=" + d.toUTCString() + ";")
            + "path=" +(params.path && params.path.length > 0 ? params.path:"/") + ";"
            + (location.protocol === 'https:' && params.secure && params.secure == true ? "secure":"");
        this.logger.info("setCookie() " + params.name);
      }
}