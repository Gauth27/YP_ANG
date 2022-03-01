import { Injectable } from "@angular/core"

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    setToken(token: string, is_admin:string, id:string) {
        localStorage.setItem("TOKEN", token)
        localStorage.setItem("ADMIN", is_admin)
        localStorage.setItem("empID", id)
    }

    retrieveToken() {
        return localStorage.getItem("TOKEN")
    }

    deleteTOken() {
        localStorage.removeItem("TOKEN")
        localStorage.removeItem("ADMIN")
    }
}