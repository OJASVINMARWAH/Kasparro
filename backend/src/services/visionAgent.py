from ultralytics import YOLO

model = YOLO("yolov8n.pt")

def detect_objects(image_path):

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

    return detections