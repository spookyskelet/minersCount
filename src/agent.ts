import { 
  BlockEvent, 
  Finding, 
  HandleBlock, 
  FindingSeverity, 
  FindingType,
} from 'forta-agent'



const ACTIVE_MINERS:{[name:string]:number} = {}

const handleBlock: HandleBlock = async (blockEvent: BlockEvent) => {
  const findings: Finding[] = [];
  //Delete not active for 24h miners
  for (let key in ACTIVE_MINERS) {
    if (ACTIVE_MINERS[key] < ((Date.now()/1000) - (60*60*24))){
      delete ACTIVE_MINERS[key]
    } 
  }

  ACTIVE_MINERS[blockEvent.block.miner] = blockEvent.block.timestamp
  findings.push(Finding.fromObject({
      name: "MinersCount",
      description: `New Block created by miner ${blockEvent.block.miner}`,
      alertId: "FORTA-120",
      severity: FindingSeverity.Medium,
      type: FindingType.Info,
      metadata:{
        totalMiners: `${Object.keys(ACTIVE_MINERS).length}`
      }
    }))
  
 
  
  return findings;
}

export default {
  handleBlock
}