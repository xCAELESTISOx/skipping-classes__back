import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './modules/users/users.module';

import 'reflect-metadata';
import { User } from './modules/users/user.entity';
import { Group } from './modules/groups/group.entity';
import { GroupsService } from './modules/groups/groups.service';
import { GroupsController } from './modules/groups/groups.controller';
import { GroupsModule } from './modules/groups/groups.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'attends-bd',
      entities: [User, Group],
      autoLoadEntities: true,
      logging: true,
      synchronize: true,
      extra: {
        ssl: { rejectUnauthorized: false },
      },
    }),
    UsersModule,
    GroupsModule,
  ],
})
export class AppModule {}
