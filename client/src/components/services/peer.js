class PeerService {
    constructor() {
      if (!this.peer) {
        this.peer = new RTCPeerConnection({
          iceServers: [
            {
              urls: [
                "stun:stun.l.google.com:19302",
                "stun:global.stun.twilio.com:3478",
              ],
            },
          ],
        });
      }
    }
    async getAnswer(offer) {
        if (this.peer) {
          await this.peer.setRemoteDescription(offer);
          console.log(offer,"offerrrrrrrrrrr ",19);

          const ans = await this.peer.createAnswer();
          await this.peer.setLocalDescription(new RTCSessionDescription(ans));
          console.log(ans,23);

          return ans;
        }
      }

      async setLocalDescription(ans) {
        if (this.peer) {
          await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
          return ans;

        }
      }



      async getOffer() {
        if (this.peer) {
          const offer = await this.peer.createOffer();
          await this.peer.setLocalDescription(new RTCSessionDescription(offer));
          return offer;
        }
      }
}
export default new PeerService();
