import {User} from "../user";
import {UserProfile} from "../../dto/user-profile";

export class JwtDTO {
  token! : string;
  type! : string;
  username! : string;
  authorities! : string[];
  user!: UserProfile;

}
