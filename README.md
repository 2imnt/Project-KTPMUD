flowchart TD
    A([Start]) --> B[Khởi tạo PlayerManager]
    B --> C[Load dữ liệu người chơi]
    C --> D[Hiển thị Main Menu]

    D --> E{Chọn chức năng}

    E -->|PvP| F[Chơi Player vs Player]
    E -->|PvE| G[Chơi Player vs Bot]
    E -->|Replay| H[Xem lại trận đấu]
    E -->|Player Info| I[Xem thống kê người chơi]
    E -->|Guide| J[Xem hướng dẫn]
    E -->|Exit| K[Lưu dữ liệu người chơi]

    F --> D
    G --> D
    H --> D
    I --> D
    J --> D

    K --> L([End])
