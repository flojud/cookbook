import { Injectable } from '@angular/core';
import { Auth, authState, GoogleAuthProvider, signInWithPopup, signOut, User } from '@angular/fire/auth';
import { NGXLogger } from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
    
    constructor(private auth: Auth, private logger: NGXLogger) {}

    setUser(auth: Auth) {
        const userJson = auth.currentUser?.toJSON();
        const userString = JSON.stringify(userJson);
        
        this.logger.info("set user: " + userString );
        sessionStorage.setItem('user', userString);
    }

    getUser(): any{
        const userString =  sessionStorage.getItem('user');
        if(userString){
            this.logger.info("get user: " + userString );
            const userJson = JSON.parse(userString); 
            return userJson;
            
        }else{
            this.logger.error('user not found in session storage');
            return false;
        }
    }

    async logout(){
      await signOut(this.auth);
      this.logger.info("user is logged out");
      sessionStorage.clear();
    }

    async login() {
        const provider = new GoogleAuthProvider();
        this.auth.languageCode = 'de';
        if(this.auth.currentUser?.emailVerified){
          this.logger.info('You are already logged with email ' + this.auth.currentUser?.email);
        }else{
          this.logger.info('start sign in with popup ' + provider.providerId);
    
          await signInWithPopup(this.auth, provider)
          .then(result => {
            const token = GoogleAuthProvider.credentialFromResult(result)?.accessToken;
            this.logger.info('token: ' +  token);
            // The signed-in user info.
            //const user = result.user;
          })
          .catch((error) => {
            this.logger.error('errorCode: ' +  error.code);
            this.logger.error('errorMessage: ' +  error.message);
            this.logger.error('email: ' +  error.email);
            this.logger.error('credential: ' +  GoogleAuthProvider.credentialFromError(error));
          });;
    
          this.setUser(this.auth);
        }
      }
}