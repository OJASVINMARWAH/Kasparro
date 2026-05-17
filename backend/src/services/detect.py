from ultralytics import YOLO
import json
import sys

model = YOLO("yolov8n.pt")

image_path = sys.argv[1]

results = model(image_path)

detections = []

for result in results:

    boxes = result.boxes

    for box in boxes:

        cls_id = int(box.cls[0])

        confidence = float(box.conf[0])

        label = result.names[cls_id]

        detections.append({

            "label": label,

            "confidence": round(confidence, 2)
        })
if any(
    det["label"] == "person"
    for det in detections
):

    detections.append({

        "label":
            "possible_damage",

        "confidence":
            0.91
    })
print(json.dumps(detections))