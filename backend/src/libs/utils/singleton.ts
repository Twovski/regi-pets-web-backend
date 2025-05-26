import { PrismaClient } from "#models/client";

export class Singleton {
	private static _prisma: PrismaClient;

	static get prisma(): PrismaClient {
		if (this._prisma) 
			return this._prisma;
		
		this._prisma = new PrismaClient();
		return this._prisma;
	}
}