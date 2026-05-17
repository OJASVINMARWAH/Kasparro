const path =
    require('path');

const {
    exec
} = require('child_process');

const detectVision =
    async (req, res) => {
        console.log(
            'VISION ROUTE HIT'
        );
        try {

            const imagePath =
                req.file.path;

            exec(

                `python src/services/detect.py ${imagePath}`,

                (
                    error,
                    stdout,
                    stderr
                ) => {

                    if (error) {

                        console.error(
                            'PYTHON ERROR:',
                            error
                        );

                        console.error(
                            'STDERR:',
                            stderr
                        );

                        console.error(
                            'STDOUT:',
                            stdout
                        );

                        return res.status(500).json({

                            success: false,

                            stderr,

                            stdout
                        });
                    }

                    try {

                        const detections =
                            JSON.parse(stdout);
                        console.log(
                            'YOLO DETECTIONS:',
                            detections
                        );
                        res.json({

                            success: true,

                            detections
                        });

                    } catch {

                        res.status(500).json({

                            success: false,

                            raw: stdout
                        });
                    }
                }
            );

        } catch (error) {

            console.error(error);

            res.status(500).json({

                success: false
            });
        }
    };

module.exports = {
    detectVision
};