import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TicketDocument = Ticket & Document;

export enum TipoTicket {
  PETICION = 'PETICION',
  QUEJA = 'QUEJA',
  RECLAMO = 'RECLAMO',
  DEVOLUCION = 'DEVOLUCION',
}

export enum EstadoTicket {
  ABIERTO = 'ABIERTO',
  EN_PROCESO = 'EN_PROCESO',
  RESUELTO = 'RESUELTO',
  CERRADO = 'CERRADO',
}

@Schema({ timestamps: true })
export class RespuestaTicket {
  @Prop({ required: true })
  agenteId: string;

  @Prop({ required: true })
  mensaje: string;

  @Prop({ default: Date.now })
  fecha: Date;
}

@Schema({ timestamps: true })
export class Ticket {
  @Prop({ required: true })
  usuarioId: string;

  @Prop({ required: true, enum: TipoTicket })
  tipo: TipoTicket;

  @Prop({ required: true })
  asunto: string;

  @Prop({ required: true })
  descripcion: string;

  @Prop({ enum: EstadoTicket, default: EstadoTicket.ABIERTO })
  estado: EstadoTicket;

  @Prop()
  ordenId?: string; // opcional, si el ticket esta relacionado a una compra

  @Prop({ type: [RespuestaTicket], default: [] })
  respuestas: RespuestaTicket[];

  @Prop({ default: Date.now })
  fecha: Date;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);