import {MigrationInterface, QueryRunner} from "typeorm";

export class Users1610463769428 implements MigrationInterface {
    name = 'Users1610463769428'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `surname` varchar(255) NOT NULL, `address` varchar(255) NOT NULL, UNIQUE INDEX `full_name` (`name`, `surname`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `full_name` ON `user`");
        await queryRunner.query("DROP TABLE `user`");
    }

}
