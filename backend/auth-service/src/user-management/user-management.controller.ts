import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserManagementService } from './user-management.service';
import { UserQueryDto } from './dto/user-query.dto';
import { CreateUserDto, ManagedUserType } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePermissionsDto } from './dto/update-permissions.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('superAdmin', 'super-admin')
@Controller('management')
export class UserManagementController {
  constructor(private readonly userManagementService: UserManagementService) {}

  @Get('users')
  async getAllUsers(@Query() query: UserQueryDto) {
    const users = await this.userManagementService.getAllUsers(query);
    return users;
  }

  @Post('users')
  async createUser(@Body() dto: CreateUserDto) {
    return this.userManagementService.createUser(dto);
  }

  @Put('users/:id')
  async updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userManagementService.updateUser(id, dto);
  }

  @Delete('users/:id')
  async deleteUser(
    @Param('id') id: string,
    @Query('userType') userType: ManagedUserType,
  ) {
    if (!userType) {
      throw new BadRequestException('userType query parameter is required');
    }
    return this.userManagementService.deleteUser(id, userType);
  }

  @Get('users/:id/logs')
  async getUserLogs(@Param('id') id: string) {
    return this.userManagementService.getUserLogs(id);
  }

  @Patch('users/:id/permissions')
  async updatePermissions(
    @Param('id') id: string,
    @Body() dto: UpdatePermissionsDto,
  ) {
    return this.userManagementService.updatePermissions(id, dto);
  }
}
