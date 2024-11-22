CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`nombre` text NOT NULL,
	`correo` text NOT NULL,
	`apellidos` text NOT NULL,
	`contrasenia` text NOT NULL,
	`esta_eliminado` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_correo_unique` ON `users` (`correo`);