/* eslint-disable prettier/prettier */
import { AuthGuard } from '@nestjs/passport';

export class AuthGuardJwtLocal extends AuthGuard('local') { }
