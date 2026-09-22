import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Ticket,
  TicketDocument,
  EstadoTicket,
} from '../schemas/ticket.schema';

@Injectable()
export class TicketsService {
  constructor(
    @InjectModel(Ticket.name) private ticketModel: Model<TicketDocument>,
  ) {}

  async crear(datos: Partial<Ticket>): Promise<Ticket> {
    const nuevo = new this.ticketModel(datos);
    return nuevo.save();
  }

  async obtenerTodos(): Promise<Ticket[]> {
    return this.ticketModel.find().sort({ fecha: -1 }).exec();
  }

  async obtenerPorUsuario(usuarioId: string): Promise<Ticket[]> {
    return this.ticketModel.find({ usuarioId }).sort({ fecha: -1 }).exec();
  }

  async obtenerPorId(id: string): Promise<Ticket | null> {
    return this.ticketModel.findById(id).exec();
  }

  async agregarRespuesta(
    id: string,
    agenteId: string,
    mensaje: string,
  ): Promise<Ticket | null> {
    return this.ticketModel
      .findByIdAndUpdate(
        id,
        {
          $push: { respuestas: { agenteId, mensaje, fecha: new Date() } },
          estado: EstadoTicket.EN_PROCESO,
        },
        { new: true },
      )
      .exec();
  }

  async cambiarEstado(
    id: string,
    estado: EstadoTicket,
  ): Promise<Ticket | null> {
    return this.ticketModel
      .findByIdAndUpdate(id, { estado }, { new: true })
      .exec();
  }
}