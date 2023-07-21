import os

_ = os.system("luna-send -n 1 -f luna://com.webos.service.camera2/open '{"+'"id": "camera1"}'+"'"+">handle.txt")
f = open("handle.txt")
for i in f:
    if "handle" in i:
        handle = i.replace('"handle":', '').replace(" ","").strip()
        
_ = os.system("luna-send -n 1 -f luna://com.webos.service.camera2/setFormat '{"+'"handle": '+str(handle)+',"params":{"width": 1920,"height": 1080,"format": "JPEG", "fps": 30}}'+"'")
_ = os.system("luna-send -n 1 -f luna://com.webos.service.camera2/startPreview '{"+'"handle": '+str(handle)+', "params": {"type":"sharedmemory","source":"0"}}'+"'")
_ = os.system("rm /home/root/ObjectDetection/picture/*")
_ = os.system("luna-send -n 1 -f luna://com.webos.service.camera2/startCapture '{"+'"handle": '+str(handle)+',"params":{"width": 1920,"height": 1080,"format": "JPEG","mode":"MODE_ONESHOT","nimage":6},"path":"/home/root/ObjectDetection/picture"}'+"'")
_ = os.system("ls /home/root/ObjectDetection/picture >imgName.txt")
f = open("imgName.txt")

val = 0
for i in f:
    val = i
_ = os.system("luna-send -n 1 -f luna://com.webos.service.camera2/stopPreview '{"+'"handle": '+str(handle)+"}'")
_ = os.system("luna-send -n 1 -f luna://com.webos.service.camera2/close '{"+'"handle": '+str(handle)+"}'")

if "" in val:
    val = val.replace("", "")
    
imgPath = '/home/root/ObjectDetection/picture/'+val
