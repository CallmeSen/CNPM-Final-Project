import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader =
      request.headers.authorization ?? request.headers.Authorization;

    if (
      !authHeader ||
      typeof authHeader !== 'string' ||
      !authHeader.startsWith('Bearer ')
    ) {
      throw new UnauthorizedException('Authorization token missing');
    }

    const token = authHeader.slice(7).trim();

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.getOrThrow<string>('JWT_SECRET'),
      });

      const resolvedRole =
        typeof payload?.role === 'string' ? payload.role.trim() : '';

      const idCandidates = [
        payload?.id,
        payload?.sub,
        payload?.userId,
        payload?.user_id,
        payload?.userID,
      ];

      const resolvedId = idCandidates
        .map((candidate) =>
          typeof candidate === 'string' ? candidate.trim() : '',
        )
        .find((candidate) => candidate.length > 0);

      if (!resolvedRole || !resolvedId) {
        throw new UnauthorizedException('Invalid token payload');
      }

      request.user = {
        id: resolvedId,
        role: resolvedRole,
        claims: payload,
      };

      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
