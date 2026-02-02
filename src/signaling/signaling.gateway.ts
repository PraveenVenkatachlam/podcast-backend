import { WebSocketGateway } from '@nestjs/websockets';
import { SignalingService } from './signaling.service';

@WebSocketGateway()
export class SignalingGateway {
  constructor(private readonly signalingService: SignalingService) {}
}
