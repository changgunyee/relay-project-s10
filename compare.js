//비교할 정보 인덱스 : 0, 5, 6, 7,8, 9,10, 13,14,15,16

const pos1 = [{"score":0.9078502655029297,"keypoints":[{"score":0.9990977048873901,"part":"nose","position":{"x":341.5798023980879,"y":100.61350662884544}},{"score":0.9987051486968994,"part":"leftEye","position":{"x":353.8270375886316,"y":90.69239041220817}},{"score":0.9987504482269287,"part":"rightEye","position":{"x":328.9090749540218,"y":90.69035630281797}},{"score":0.8916394114494324,"part":"leftEar","position":{"x":372.9496307966774,"y":100.7299697816604}},{"score":0.8360435962677002,"part":"rightEar","position":{"x":313.3317548106153,"y":103.14861015587002}},{"score":0.9943587183952332,"part":"leftShoulder","position":{"x":405.14301463323807,"y":175.50126250151993}},{"score":0.9963657855987549,"part":"rightShoulder","position":{"x":289.40340865910747,"y":182.06211906462795}},{"score":0.9972079396247864,"part":"leftElbow","position":{"x":425.93177765723794,"y":269.6179971064111}},{"score":0.9964956641197205,"part":"rightElbow","position":{"x":269.95345297490576,"y":275.6942734180258}},{"score":0.9920177459716797,"part":"leftWrist","position":{"x":438.7981700526137,"y":344.4363106456712}},{"score":0.9942218661308289,"part":"rightWrist","position":{"x":278.5174192064931,"y":359.56041952051544}},{"score":0.9913773536682129,"part":"leftHip","position":{"x":393.53303219093885,"y":369.7432011110773}},{"score":0.9942455887794495,"part":"rightHip","position":{"x":313.59860312613995,"y":376.8054709824143}},{"score":0.9272851347923279,"part":"leftKnee","position":{"x":397.31550238939576,"y":513.616597216417}},{"score":0.9791274666786194,"part":"rightKnee","position":{"x":323.389610260841,"y":506.18729409540674}},{"score":0.4051453471183777,"part":"leftAnkle","position":{"x":400.7387302265093,"y":564.8258010329904}},{"score":0.44136959314346313,"part":"rightAnkle","position":{"x":326.89597163218934,"y":567.2269312045918}}]}]
const pos2 = [{"score":0.8553095880676719,"keypoints":[{"score":0.9950242638587952,"part":"nose","position":{"x":329.03001362247693,"y":135.8276390936588}},{"score":0.9857729077339172,"part":"leftEye","position":{"x":336.5566719737962,"y":125.61100881851138}},{"score":0.9819439053535461,"part":"rightEye","position":{"x":319.86563656580586,"y":123.36594251343249}},{"score":0.8715291619300842,"part":"leftEar","position":{"x":352.99207932290403,"y":135.11341614482004}},{"score":0.776299774646759,"part":"rightEar","position":{"x":301.2458997199508,"y":133.71606017828915}},{"score":0.9975765347480774,"part":"leftShoulder","position":{"x":386.4075241385731,"y":180.37602406067606}},{"score":0.9914723038673401,"part":"rightShoulder","position":{"x":284.1376504267236,"y":180.81625378085482}},{"score":0.9628225564956665,"part":"leftElbow","position":{"x":448.9973728758816,"y":167.86398564795113}},{"score":0.9601637721061707,"part":"rightElbow","position":{"x":216.4787440912269,"y":181.00498778346912}},{"score":0.8529005646705627,"part":"leftWrist","position":{"x":507.75896836811467,"y":108.90074139903027}},{"score":0.6667360663414001,"part":"rightWrist","position":{"x":160.1133860131646,"y":143.08780417831954}},{"score":0.9510475993156433,"part":"leftHip","position":{"x":369.8426634792224,"y":333.8610626101958}},{"score":0.980222761631012,"part":"rightHip","position":{"x":295.60835545165065,"y":341.89288306329036}},{"score":0.9757496118545532,"part":"leftKnee","position":{"x":365.4580967528347,"y":462.0772246720726}},{"score":0.9060664772987366,"part":"rightKnee","position":{"x":295.91172273984677,"y":463.0350562663393}},{"score":0.405924528837204,"part":"leftAnkle","position":{"x":356.57729746302743,"y":546.0072380095604}},{"score":0.27901020646095276,"part":"rightAnkle","position":{"x":313.72379228762617,"y":541.2602168576726}}]}]

const threadHold =  100;
//0.8이상
const threadScore = 0.6;

//console.log(comparePosition(pos1, pos2))

function comparePosition(pos1, pos2){
    
    pos2.sort(function(a,b){
        return a.socre < b.score;
    })

    if(pos1.length < pos2.length){
        const pos2 = pos2[0,pos1.length];
    }else if(pos1.length > pos2.length){
        return false;
    }

    {
        pos1.forEach(function(pose, posidx){
            const passCount = Math.floor(pose.keypoints.filter(keypoint => keypoint.score > threadScore).length * 0.8);
            
            let ans = 0;
            pose.keypoints.filter(keypoint => keypoint.score > threadScore).map(
                function(keypoint){
                    let position ={} ; 
                    position.x = keypoint.position.x, position.y = keypoint.position.y 
                    return position
                }).forEach( function(position, index){
                    if(Math.abs(position.x - pos2[posidx].keypoints[index].position.x) <= threadHold && Math.abs(position.y - pos2[posidx].keypoints[index].position.y) <= threadHold){
                        ans++;
                    }
                }
            );
            if(ans < passCount) return false;
        })
    }
    return true;
    
}



module.exports = comparePosition;
