import {Injectable} from "@angular/core"
import {createClient, SupabaseClient, User} from "@supabase/supabase-js"
import {environment} from "../../environments/environment"
import {BehaviorSubject, Observable} from "rxjs"
import {Router} from "@angular/router"

// https://supabase.com/blog/building-a-realtime-trello-board-with-supabase-and-angular
// https://www.youtube.com/watch?v=RtgQT4sdCrY

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabase: SupabaseClient
  private currentUser: BehaviorSubject<boolean | User | any> = new BehaviorSubject(null)

  constructor(private router: Router) {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey,
    )

    this.supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        console.log('SET USER: ', session)
        this.currentUser.next(session?.user)
      } else {
        this.currentUser.next(false)
      }
    })

    this.loadUser()
  }

  async loadUser() {
    if (this.currentUser.value) {
      return
    }

    const user = await this.supabase.auth.getUser()

    if (user.data.user) {
      this.currentUser.next(user.data.user)
    } else {
      this.currentUser.next(false)
    }
  }

  getCurrentUser(): Observable<User | boolean> {
    return this.currentUser.asObservable();
  }

  getCurrentUserId() {
    if (this.currentUser.value) {
      return (this.currentUser.value as User).id
    } else {
      return null
    }
  }

  signUp(credentials: {email: string; password: string}) {
    return this.supabase.auth.signUp(credentials)
  }

  signIn(credentials: {email: string; password: string}) {
    return this.supabase.auth.signInWithPassword(credentials)
  }

  async signOut() {
    await this.supabase.auth.signOut()
    this.router.navigateByUrl("/login", {replaceUrl: true})
  }
}
