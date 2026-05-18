from ultralytics import YOLO

# Load model once
model = YOLO("yolov8n.pt")


def detect_objects(image_path):

    try:
        # Suppress YOLO terminal logs
        results = model(image_path, verbose=False)

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

        return {
            "success": True,
            "detections": detections
        }

    except Exception as e:

        return {
            "success": True
        }