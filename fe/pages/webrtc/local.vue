<template>
  <page-layout>
    <div class="block">
      <div class="pc-wrap">
        <div>
          <p>PC1</p>
          <video ref="local" width="300" height="200" autoplay controls />
        </div>
        <div>
          <p>PC2</p>
          <video ref="remote" width="300" height="200" autoplay controls />
        </div>
      </div>
      <div class="block">
        <button @click="showPC1">接通 PC1 的本地 stream</button>
        <button @click="showPC2">连接 PC2 的 stream</button>
      </div>
    </div>
  </page-layout>
</template>

<script>
/**
 * ICE (交互式连接建立)是一个被 WebRTC 使用的框架（跟其他技术在一起使用）
 * 它被用在两端之间的连接，不管是何种网络类型 (通常用在视频或语音聊天)
 * 这个协议让两端能够互相找到对方并建立一个连接
 * 即便它们都使用了网络地址转译(NAT)去跟内网的其他设备共享了一个公网IP地址。
 * 这个框架的算法是寻找最低等待时间的路径去连接两端，通常采用以下顺序寻找：
 *  1、直接的 UDP 连接 (在且仅在这种情况下，一个 STUN 的服务器会被用来查找主机端面向网络的地址)。
 *  2、直接的 TCP 连接, 通过 HTTP 端口
 *  3、直接的 TCP 连接, 通过 HTTPS 端口
 *  4、间接的连接通过中继器／TURN服务器 (如果一个直接连接失败了, 比如当一个主机端位于防火墙之后阻止了NAT穿越)
**/
export default {
  localStream: null,
  destroyed() {
    if (this.$options.localStream) {
      this.$options.localStream.getTracks().forEach(stream => stream.stop())
    }
  },
  methods: {
    async showPC1() {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      if (this.$refs.local) {
        this.$refs.local.srcObject = this.$options.localStream = stream
      }
    },
    async showPC2() {
      // offer 的参数
      const offerOptions = {
        offerToReceiveAudio: 1,
        offerToReceiveVideo: 1
      }

      // RTCPeerConnection 的实例构造参数，一些描述信息
      const configuration = {}

      // 实例化 PC1 和 PC2
      const pc1 = new RTCPeerConnection(configuration)
      const pc2 = new RTCPeerConnection(configuration)

      // 绑定 PC1 和 PC2 的关键事件
      // 获取对等方的 pc 对象
      const getOtherPc = pc => {
        return pc === pc1 ? pc2 : pc1
      }
      const onIceCandidate = async (pc, e) => {
        // 通常可能是通过 new RTCIceCandidate(SDP)
        // 接收信令服务器的 sdp 字符串信息去构建一个 candidate 候选者对象并加入
        const otherPc = (pc === pc1 ? pc2 : pc1)
        if (!e.candidate) return
        await otherPc.addIceCandidate(e.candidate)
      }
      const gotRemoteStream = e => {
        const { remote } = this.$refs
        if (remote.srcObject !== e.streams[0]) {
          remote.srcObject = e.streams[0]
        }
      }
      pc1.addEventListener('icecandidate', e => onIceCandidate(pc1, e))
      pc2.addEventListener('icecandidate', e => onIceCandidate(pc2, e))
      pc2.addEventListener('track', gotRemoteStream)

      // add stream track
      const { localStream } = this.$options
      localStream.getTracks().forEach(track => {
        // 将新的媒体轨道添加到轨道集，该轨道将被发送到另一对等方，触发 pc2 track 事件
        pc1.addTrack(track, localStream)
      })

      // pc1 发送 offer
      const offer = await pc1.createOffer(offerOptions)
      await pc1.setLocalDescription(offer) // 触发 pc1 icecandidate 事件
      // pc2 接收 offer
      await pc2.setRemoteDescription(offer)
      // pc2 创建应答
      const answer = await pc2.createAnswer()
      await pc2.setLocalDescription(answer) // 触发 pc2 icecandidate 事件
      // pc1 接收应答
      await pc1.setRemoteDescription(answer)
    }
  }
}
</script>

<style scoped>
.pc-wrap {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
</style>
