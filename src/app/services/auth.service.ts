import {Injectable} from "@angular/core"
import {createClient, SupabaseClient, User} from "@supabase/supabase-js"
import {environment} from "../../environments/environment"
import {BehaviorSubject} from "rxjs"
import {Router} from "@angular/router"

// https://www.youtube.com/watch?v=jmCiI_OSarA

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabase: SupabaseClient
  private _currentUser: BehaviorSubject<boolean | User | any> = new BehaviorSubject(null)

  constructor(private router: Router) {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey,
    )

    const user = this.supabase.auth.getUser()
    if(user) {
      this._currentUser.next(user)
    } else {
      this._currentUser.next(false)
      this.router.navigateByUrl("/login", {replaceUrl: true})
    }

    this.supabase.auth.onAuthStateChange((event, session) => {
      if(event == 'SIGNED_IN') {
        this._currentUser.next(session?.user)
      } else {
        this._currentUser.next(false)
      }
    })
  }

  signIn(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({email, password})
  }

  signOut() {
    return this.supabase.auth.signOut()
  }

  get currentUser() {
    return this._currentUser.asObservable()
  }
}
