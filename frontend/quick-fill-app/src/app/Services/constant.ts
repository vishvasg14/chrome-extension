/**
 * All route url paths
 */
  // export class ROUTS { 
  //   public static INDEX: string = '';
  //   public static REGISTRATION: string = 'sign-up';
  //   public static LOGIN: string = 'login';
    
  // } 
  //constants for access token
  export class CONSTANTS {
    public static readonly ACCESS_TOKEN_COOKIE = 'f-et';
  }
  
  export class URL {  
    public static readonly SERVER_URL: string = 'http://localhost:8080/';

    //Authentication endpoints
    public static readonly REGISTRATION: string = URL.SERVER_URL + 'auth/registration';
    public static readonly LOGIN: string = URL.SERVER_URL + 'auth/login';
    public static readonly LOGOUT: string = URL.SERVER_URL + 'auth/logout';
    

    //Admin endpoints
    public static readonly ADMIN_DASHBOARD: string = URL.SERVER_URL + 'admin/getrequest';
    


    //User endpoint
    public static readonly LEAVE: string = URL.SERVER_URL + 'user/leave';
   
  }
  
    