import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Match, Player, Team} from "../data/types";

const endpoint = "https://api.lestro.site/"


@Injectable({
  providedIn: 'root'
})
export class ConnectBackendService {


  constructor(private http: HttpClient) {
  }

  private get<Type>(url: string){
    return this.http.get<Type>(
      url,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
          "Content-Type": "application/json",
        },
      }
    )
  }

  getPlayer(id: number) {
    return this.get<Player>(`${endpoint}player/${id}`)
  }

  getPlayers(){
    return this.get<Player[]>(`${endpoint}players`)
  }

  getMatches(week: string = ""){
    return this.get<Match[]>(`${endpoint}matches/${week}`)
  }

  getMatch(id: number){
    return this.get<Match>(`${endpoint}matches/${id}`)
  }

  getTeam(id: number){
    return this.get<Team>(`${endpoint}team/${id}`)
  }

  getTeams(){
    return this.get<Team[]>(`${endpoint}teams`)
  }

  getTeamPlayers(id: number){
    return this.get<Player[]>(`${endpoint}team/${id}/players`)
  }

  getPlayerPhoto(id: number){
    return `${endpoint}photos/player_${id}.png`
  }
}
