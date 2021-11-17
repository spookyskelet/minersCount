import {
    createBlockEvent,
    HandleBlock
  } from "forta-agent"
  import agent from "./agent"
  
  describe("miner count agent", () => {
    let handleBlock: HandleBlock
  
    const createTxEventWithMiner= (miner: string) => createBlockEvent({
      type:0,
      block:{
          difficulty: "",
          gasLimit :"",
          extraData:{} as any,
          gasUsed:"",
          hash:"",
          miner:miner,
          logsBloom:"",
          mixHash:"",
          nonce:"",
          number:1,
          parentHash:"",
          receiptsRoot:"",
          sha3Uncles:"",
          size:"",
          stateRoot:"",
          timestamp: Date.now(),
          totalDifficulty:"",
          transactions: {} as any,
          transactionsRoot:'',
          uncles:[]
      }
    })
  
    beforeAll(() => {
      handleBlock = agent.handleBlock
    })
  
    describe("handle block", () => {
      it("New miner added", async () => {
        const txEvent = createTxEventWithMiner("123")
  
        const findings = await handleBlock(txEvent)
  
        expect(findings[0].metadata.totalMiners).toEqual("1")
      })
  
      it("Exist miner", async () => {
        const txEvent = createTxEventWithMiner("123")
  
        const findings = await handleBlock(txEvent)
  
        expect(findings[0].metadata.totalMiners).toEqual("1")
      })
    })
  })