import { MessageType } from './message-type.enum';
import {Blocker} from '../blockers/blocker.model';

export class Message {
  type: MessageType;
  blocker: Blocker;
}
