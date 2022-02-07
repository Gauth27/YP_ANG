import { Injectable } from "@angular/core"

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    setToken(token: string) {
        localStorage.setItem("TOKEN", token)
    }

    retrieveToken() {
        return localStorage.getItem("TOKEN")
    }

    deleteTOken() {
        localStorage.removeItem("TOKEN")
    }
}