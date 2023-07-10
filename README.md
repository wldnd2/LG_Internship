# LG_Internship
## 초기 사용법

### 1. 깃 clone
```bash
git clone https://github.com/wldnd2/LG_Internship.git
cd LG_Internship/ai_service/yolo3
```

### 2. 모델 다운로드
```bash
wget https://raw.githubusercontent.com/pjreddie/darknet/master/cfg/yolov3.cfg
wget https://pjreddie.com/media/files/yolov3.weights
wget https://raw.githubusercontent.com/pjreddie/darknet/master/data/coco.names
```

### 3. IPK 만들어서 업로드
```bash
cd ../.. # ai_test와 ai_service폴더가 둘다 보이는 경로에서 하기
ares-package ai_test ai_service
```