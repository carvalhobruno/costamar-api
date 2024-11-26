import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../user/service/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey:
        '9dfbadefe706948b041b7f71f77e7368f33d1d6d81bf4540832927307a454de214d286d27a773ef5d3c2157fa9cd67aa7a2c04101c8545a58c72316fe90c6905b4a826aaade1fb7684e2db0056e99dfc6b142036de2841394a82d2f20b727961f33a8840e9b3e3d19702150416f0ed180e0eca9081b62eddb64c0f0e5327c76b1b1c29262d269010d53532fc6228ce1821e8cc8d663b3860d489668a6e2952df6edb2587270b52ec28e662aca022cdc2591aa86ec00f396254c9dac931a39a98d6fa3a1a37549d3f0f7cbfa8526730b49a7e82656fbd461ab958dbcdcff58b4d95f39dd0471a1a76351fc3e1ee2b10ba8f01a28196739da2075123b7ddfa2dd5',
    });
  }

  async validate(payload: any) {
    const user = await this.userService.findByEmail(payload.email);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
