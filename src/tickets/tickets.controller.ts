import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { Ticket, EstadoTicket } from '../schemas/ticket.schema';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  async crear(@Body() datos: Partial<Ticket>) {
    return this.ticketsService.crear(datos);
  }

  @Get()
  async obtenerTodos() {
    return this.ticketsService.obtenerTodos();
  }

  @Get('usuario/:usuarioId')
  async obtenerPorUsuario(@Param('usuarioId') usuarioId: string) {
    return this.ticketsService.obtenerPorUsuario(usuarioId);
  }

  @Get(':id')
  async obtenerPorId(@Param('id') id: string) {
    return this.ticketsService.obtenerPorId(id);
  }

  @Patch(':id/respuesta')
  async agregarRespuesta(
    @Param('id') id: string,
    @Body() body: { agenteId: string; mensaje: string },
  ) {
    return this.ticketsService.agregarRespuesta(
      id,
      body.agenteId,
      body.mensaje,
    );
  }

  @Patch(':id/estado')
  async cambiarEstado(
    @Param('id') id: string,
    @Body() body: { estado: EstadoTicket },
  ) {
    return this.ticketsService.cambiarEstado(id, body.estado);
  }
}