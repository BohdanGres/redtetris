import { getCookie, setCookie } from './cookie';
import socket from './socket';

export default function () {
  if (window.location.hash) {
    const href = window.location.hash;
      const start =  href.indexOf('[');
      const end = href.lastIndexOf(']');
      if (start === end) {
        window.location.hash = '';
        return;
      }
      const roomName = href.slice(start + 1, end);
      const userName = href.slice(1, start);
      if (!roomName || ! userName) {
        window.location.hash ='';
        return;
      }
      if (getCookie('userName') !== userName) {
        setCookie('userName', userName);
        setCookie('uuid', '');
      } else {
        socket.emit('urlCreate', { roomName, playerId: getCookie('uuid') });
      }
      window.location.hash = '';

  }
}
