// E-Commerce Data Analytics & Quality Audit Application Script
// Contains full 298 cleaned records and interactive charting engine

// Load cleaned data from CSV structure
const RAW_CSV_DATA = `Timestamp,Transaction_ID,Platform,Raw_Product_Name,Harmonized_Category,Order_Qty,Unit_Price_THB,Transaction_Revenue_THB,Is_Defective,Customer_Review_Rating,Product_Record_ID,Warehouse_Zone,System_IP_Node,Days_Listed_In_Catalog,Estimated_Shipping_Cost,Supplier_Delivery_Days,Raw_Category_Tag
2026-09-01 06:05:59,TX-10000,Lazada,Nintendo Switch OLED Model,Gaming & Consoles,3,14543.88,43631.64,0,4.0,P000008,Zone_B,IP_10.20.30.151,164,105,5,Electronics
2026-09-01 06:27:27,TX-10001,TikTok Shop,Samsung Galaxy S24 Ultra,Smartphones & Tablets,1,36051.07,36051.07,0,5.0,P000002,Zone_A,IP_10.20.30.164,50,226,2,Home & Living
2026-09-01 10:55:53,TX-10002,Shopee,iPad Air 6 M2 WiFi,Smartphones & Tablets,3,25023.01,75069.03,0,4.0,P000005,Zone_C,IP_10.20.30.152,49,190,3,Electronics
2026-09-01 12:06:25,TX-10003,TikTok Shop,iPhone 15 Pro Max 256GB,Smartphones & Tablets,1,38077.21,38077.21,0,5.0,P000001,Zone_B,IP_10.20.30.185,183,238,5,Electronics
2026-09-01 13:36:24,TX-10004,TikTok Shop,iPhone 15 Pro Max 256GB,Smartphones & Tablets,1,41460.66,41460.66,0,4.5,P000001,Zone_D,IP_10.20.30.153,156,98,4,Electronics
2026-09-01 16:58:07,TX-10005,Shopee,iPad Air 6 M2 WiFi,Smartphones & Tablets,3,23966.21,71898.63,1,4.0,P000005,Zone_B,IP_10.20.30.163,97,95,5,Electronics
2026-09-01 18:08:38,TX-10006,TikTok Shop,AirPods Pro Gen 2 USB-C,Audio & Headphones,1,9338.74,9338.74,0,5.0,P000003,Zone_B,IP_10.20.30.174,139,162,3,Electronics
2026-09-01 18:15:25,TX-10007,TikTok Shop,Logitech MX Master 3S Mouse,Computer Peripherals,1,3733.78,3733.78,0,4.5,P000004,Zone_B,IP_10.20.30.159,145,239,4,Fashion
2026-09-01 18:55:48,TX-10008,TikTok Shop,AirPods Pro Gen 2 USB-C,Audio & Headphones,3,8947.93,26843.79,0,4.5,P000003,Zone_B,IP_10.20.30.170,172,185,5,Electronics
2026-09-01 19:48:15,TX-10009,TikTok Shop,iPhone 15 Pro Max 256GB,Smartphones & Tablets,3,41772.52,125317.56,0,4.0,P000001,Zone_C,IP_10.20.30.185,149,92,1,Electronics
2026-09-01 21:02:46,TX-10010,TikTok Shop,iPhone 15 Pro Max 256GB,Smartphones & Tablets,2,39992.16,79984.32,0,4.5,P000001,Zone_D,IP_10.20.30.161,108,197,4,Electronics
2026-09-01 23:30:54,TX-10011,Shopee,iPad Air 6 M2 WiFi,Smartphones & Tablets,2,24209.26,48418.52,0,4.0,P000005,Zone_C,IP_10.20.30.176,145,173,1,Electronics
2026-09-02 04:42:35,TX-10012,Shopee,PlayStation 5 Slim 1TB,Gaming & Consoles,2,19269.97,38539.94,0,4.0,P000006,Zone_D,IP_10.20.30.189,121,146,2,Fashion
2026-09-02 05:28:01,TX-10013,TikTok Shop,AirPods Pro Gen 2 USB-C,Audio & Headphones,1,8859.54,8859.54,0,5.0,P000003,Zone_B,IP_10.20.30.151,43,139,4,Electronics
2026-09-02 05:50:50,TX-10014,Lazada,Sony WH-1000XM5 ANC Headphone,Audio & Headphones,1,13064.55,13064.55,0,4.0,P000009,Zone_A,IP_10.20.30.162,184,88,1,Electronics
2026-09-02 06:25:56,TX-10015,Shopee,iPad Air 6 M2 WiFi,Smartphones & Tablets,1,24101.51,24101.51,0,4.5,P000005,Zone_C,IP_10.20.30.181,154,134,3,Electronics
2026-09-02 06:34:38,TX-10016,Lazada,Nintendo Switch OLED Model,Gaming & Consoles,4,14457.61,57830.44,0,4.0,P000008,Zone_A,IP_10.20.30.180,197,226,3,Electronics
2026-09-02 06:37:48,TX-10017,TikTok Shop,iPhone 15 Pro Max 256GB,Smartphones & Tablets,2,38086.33,76172.66,0,5.0,P000001,Zone_C,IP_10.20.30.165,87,241,2,Electronics
2026-09-02 08:19:41,TX-10018,Unspecified,iPad Air 6 M2 WiFi,Smartphones & Tablets,2,23376.50,46753.00,0,4.0,P000005,Zone_B,IP_10.20.30.181,57,111,4,Electronics
2026-09-02 08:43:16,TX-10019,TikTok Shop,AirPods Pro Gen 2 USB-C,Audio & Headphones,2,9300.87,18601.74,1,5.0,P000003,Zone_C,IP_10.20.30.181,55,155,4,Electronics
2026-09-02 10:00:09,TX-10020,TikTok Shop,iPhone 15 Pro Max 256GB,Smartphones & Tablets,4,41457.15,165828.60,0,4.5,P000001,Zone_B,IP_10.20.30.183,142,156,4,Electronics
2026-09-02 11:32:28,TX-10021,TikTok Shop,Logitech MX Master 3S Mouse,Computer Peripherals,1,3882.71,3882.71,0,4.0,P000004,Zone_C,IP_10.20.30.160,95,103,2,Fashion
2026-09-02 11:39:51,TX-10022,Shopee,iPad Air 6 M2 WiFi,Smartphones & Tablets,2,24187.12,48374.24,0,3.0,P000005,Zone_B,IP_10.20.30.159,182,175,4,Electronics
2026-09-02 13:01:12,TX-10023,Shopee,Keychron K2 V2 Mechanical Keyboard,Computer Peripherals,2,3422.08,6844.16,0,4.0,P000007,Zone_B,IP_10.20.30.164,160,58,3,Home & Living
2026-09-02 13:52:10,TX-10024,TikTok Shop,iPhone 15 Pro Max 256GB,Smartphones & Tablets,2,38655.60,77311.20,0,4.5,P000001,Zone_D,IP_10.20.30.166,73,137,1,Electronics
2026-09-02 14:39:42,TX-10025,TikTok Shop,AirPods Pro Gen 2 USB-C,Audio & Headphones,1,8867.69,8867.69,0,4.0,P000003,Zone_B,IP_10.20.30.189,126,86,3,Electronics
2026-09-02 15:34:43,TX-10026,TikTok Shop,Samsung Galaxy S24 Ultra,Smartphones & Tablets,4,37344.20,149376.80,0,5.0,P000002,Zone_D,IP_10.20.30.167,71,98,3,Home & Living
2026-09-02 16:57:23,TX-10027,Lazada,Sony WH-1000XM5 ANC Headphone,Audio & Headphones,4,13007.92,52031.68,0,4.5,P000009,Zone_B,IP_10.20.30.158,35,90,1,Electronics
2026-09-02 17:01:58,TX-10028,Lazada,DJI Osmo Pocket 3 Creator Combo,Cameras & Photography,2,17144.15,34288.30,0,4.0,P000010,Zone_A,IP_10.20.30.174,196,66,3,Electronics
2026-09-03 01:23:09,TX-10029,Shopee,PlayStation 5 Slim 1TB,Gaming & Consoles,2,19796.61,39593.22,0,4.5,P000006,Zone_B,IP_10.20.30.189,52,137,2,Fashion
2026-09-03 03:07:44,TX-10030,Lazada,DJI Osmo Pocket 3 Creator Combo,Cameras & Photography,4,18770.32,75081.28,0,5.0,P000010,Zone_A,IP_10.20.30.163,118,70,1,Electronics
2026-09-03 03:13:43,TX-10031,TikTok Shop,AirPods Pro Gen 2 USB-C,Audio & Headphones,3,9076.36,27229.08,0,4.0,P000003,Zone_A,IP_10.20.30.174,152,100,3,Electronics
2026-09-03 06:39:29,TX-10032,Lazada,Nintendo Switch OLED Model,Gaming & Consoles,1,13950.17,13950.17,1,4.0,P000008,Zone_B,IP_10.20.30.171,176,108,5,Electronics
2026-09-03 07:37:15,TX-10033,Lazada,Nintendo Switch OLED Model,Gaming & Consoles,2,13635.24,27270.48,0,3.0,P000008,Zone_A,IP_10.20.30.179,80,216,3,Electronics
2026-09-03 11:27:00,TX-10034,TikTok Shop,Samsung Galaxy S24 Ultra,Smartphones & Tablets,2,39089.28,78178.56,0,5.0,P000002,Zone_D,IP_10.20.30.169,40,232,2,Home & Living
2026-09-03 14:34:41,TX-10035,Shopee,PlayStation 5 Slim 1TB,Gaming & Consoles,2,19249.14,38498.28,1,4.5,P000006,Zone_C,IP_10.20.30.170,41,90,4,Fashion
2026-09-03 15:29:36,TX-10036,Shopee,Keychron K2 V2 Mechanical Keyboard,Computer Peripherals,3,3381.92,10145.76,0,4.5,P000007,Zone_B,IP_10.20.30.181,103,88,3,Home & Living
2026-09-03 23:15:08,TX-10037,TikTok Shop,Samsung Galaxy S24 Ultra,Smartphones & Tablets,4,39457.41,157829.64,0,5.0,P000002,Zone_A,IP_10.20.30.170,37,190,4,Home & Living
2026-09-04 02:52:16,TX-10038,Lazada,DJI Osmo Pocket 3 Creator Combo,Cameras & Photography,4,18477.34,73909.36,0,5.0,P000010,Zone_B,IP_10.20.30.184,181,241,5,Electronics
2026-09-04 03:30:36,TX-10039,TikTok Shop,Samsung Galaxy S24 Ultra,Smartphones & Tablets,2,39604.74,79209.48,0,4.5,P000002,Zone_D,IP_10.20.30.181,70,60,3,Home & Living
2026-09-04 05:16:07,TX-10040,Lazada,DJI Osmo Pocket 3 Creator Combo,Cameras & Photography,1,18304.04,18304.04,0,5.0,P000010,Zone_B,IP_10.20.30.179,193,196,1,Electronics
2026-09-04 08:16:38,TX-10041,TikTok Shop,iPhone 15 Pro Max 256GB,Smartphones & Tablets,5,40352.53,201762.65,0,4.0,P000001,Zone_B,IP_10.20.30.188,114,188,4,Electronics
2026-09-04 14:39:15,TX-10042,Lazada,Nintendo Switch OLED Model,Gaming & Consoles,3,13786.36,41359.08,0,4.0,P000008,Zone_A,IP_10.20.30.161,101,126,5,Electronics
2026-09-04 17:13:04,TX-10043,TikTok Shop,iPhone 15 Pro Max 256GB,Smartphones & Tablets,1,41626.59,41626.59,0,4.0,P000001,Zone_D,IP_10.20.30.167,84,176,1,Electronics
2026-09-04 18:51:09,TX-10044,Lazada,Sony WH-1000XM5 ANC Headphone,Audio & Headphones,4,13372.22,53488.88,0,3.0,P000009,Zone_C,IP_10.20.30.170,166,95,1,Electronics
2026-09-04 19:29:25,TX-10045,Shopee,PlayStation 5 Slim 1TB,Gaming & Consoles,4,18040.46,72161.84,0,4.5,P000006,Zone_C,IP_10.20.30.162,76,94,1,Fashion
2026-09-05 01:34:39,TX-10046,Shopee,Keychron K2 V2 Mechanical Keyboard,Computer Peripherals,2,3334.23,6668.46,0,5.0,P000007,Zone_A,IP_10.20.30.170,172,50,1,Home & Living
2026-09-05 07:46:56,TX-10047,Lazada,DJI Osmo Pocket 3 Creator Combo,Cameras & Photography,2,17678.87,35357.74,0,3.0,P000010,Zone_B,IP_10.20.30.157,133,217,3,Electronics
2026-09-05 08:05:05,TX-10048,Shopee,Keychron K2 V2 Mechanical Keyboard,Computer Peripherals,1,3608.69,3608.69,0,4.0,P000007,Zone_A,IP_10.20.30.189,71,157,3,Home & Living
2026-09-05 09:08:00,TX-10049,Lazada,DJI Osmo Pocket 3 Creator Combo,Cameras & Photography,1,18772.22,18772.22,0,4.5,P000010,Zone_A,IP_10.20.30.156,89,68,3,Electronics
2026-09-05 09:33:09,TX-10050,TikTok Shop,AirPods Pro Gen 2 USB-C,Audio & Headphones,1,8588.87,8588.87,0,5.0,P000003,Zone_A,IP_10.20.30.172,41,125,5,Electronics
2026-09-05 15:38:16,TX-10051,TikTok Shop,Samsung Galaxy S24 Ultra,Smartphones & Tablets,3,38256.76,114770.28,0,4.0,P000002,Zone_B,IP_10.20.30.181,159,121,5,Home & Living
2026-09-05 15:51:30,TX-10052,Lazada,Sony WH-1000XM5 ANC Headphone,Audio & Headphones,1,12746.35,12746.35,1,4.5,P000009,Zone_D,IP_10.20.30.160,36,249,5,Electronics
2026-09-05 19:48:00,TX-10053,Lazada,Nintendo Switch OLED Model,Gaming & Consoles,1,14553.18,14553.18,0,3.0,P000008,Zone_A,IP_10.20.30.171,109,238,2,Electronics
2026-09-06 02:09:52,TX-10054,Lazada,DJI Osmo Pocket 3 Creator Combo,Cameras & Photography,1,18512.39,18512.39,0,4.0,P000010,Zone_B,IP_10.20.30.171,160,158,5,Electronics
2026-09-06 12:31:35,TX-10055,Shopee,Keychron K2 V2 Mechanical Keyboard,Computer Peripherals,2,3618.42,7236.84,0,5.0,P000007,Zone_D,IP_10.20.30.174,138,61,3,Home & Living
2026-09-06 13:20:47,TX-10056,Lazada,Sony WH-1000XM5 ANC Headphone,Audio & Headphones,4,12859.61,51438.44,0,5.0,P000009,Zone_A,IP_10.20.30.171,32,238,3,Electronics
2026-09-06 15:59:30,TX-10057,TikTok Shop,Logitech MX Master 3S Mouse,Computer Peripherals,1,3866.78,3866.78,0,3.0,P000004,Zone_C,IP_10.20.30.177,56,210,2,Fashion
2026-09-06 16:27:14,TX-10058,TikTok Shop,Logitech MX Master 3S Mouse,Computer Peripherals,1,3811.63,3811.63,0,5.0,P000004,Zone_D,IP_10.20.30.178,143,94,2,Fashion
2026-09-06 18:37:26,TX-10059,TikTok Shop,iPhone 15 Pro Max 256GB,Smartphones & Tablets,3,38129.94,114389.82,0,4.5,P000001,Zone_A,IP_10.20.30.162,136,139,5,Electronics
2026-09-06 19:12:37,TX-10060,Lazada,Nintendo Switch OLED Model,Gaming & Consoles,2,14406.96,28813.92,0,5.0,P000008,Zone_D,IP_10.20.30.167,69,152,4,Electronics
2026-09-07 02:23:55,TX-10061,TikTok Shop,AirPods Pro Gen 2 USB-C,Audio & Headphones,1,9178.48,9178.48,0,4.5,P000003,Zone_D,IP_10.20.30.151,190,246,2,Electronics
2026-09-07 02:42:58,TX-10062,Shopee,Keychron K2 V2 Mechanical Keyboard,Computer Peripherals,2,3674.90,7349.80,0,4.5,P000007,Zone_D,IP_10.20.30.178,158,57,1,Home & Living
2026-09-07 06:38:55,TX-10063,TikTok Shop,Samsung Galaxy S24 Ultra,Smartphones & Tablets,1,39782.25,39782.25,0,4.5,P000002,Zone_D,IP_10.20.30.170,37,202,3,Home & Living
2026-09-07 10:03:14,TX-10064,TikTok Shop,Samsung Galaxy S24 Ultra,Smartphones & Tablets,1,38110.09,38110.09,0,4.5,P000002,Zone_D,IP_10.20.30.164,130,140,1,Home & Living
2026-09-07 12:51:25,TX-10065,Shopee,Keychron K2 V2 Mechanical Keyboard,Computer Peripherals,2,3594.15,7188.30,0,4.0,P000007,Zone_D,IP_10.20.30.176,189,223,3,Home & Living
2026-09-07 17:04:39,TX-10066,Shopee,PlayStation 5 Slim 1TB,Gaming & Consoles,2,19740.61,39481.22,0,3.0,P000006,Zone_A,IP_10.20.30.180,153,136,3,Fashion
2026-09-07 18:49:06,TX-10067,TikTok Shop,AirPods Pro Gen 2 USB-C,Audio & Headphones,4,9211.19,36844.76,0,4.0,P000003,Zone_C,IP_10.20.30.164,136,207,2,Electronics
2026-09-07 23:52:45,TX-10068,Lazada,Sony WH-1000XM5 ANC Headphone,Audio & Headphones,1,12574.08,12574.08,0,5.0,P000009,Zone_B,IP_10.20.30.172,130,224,2,Electronics
2026-09-08 03:47:47,TX-10069,Lazada,DJI Osmo Pocket 3 Creator Combo,Cameras & Photography,2,17811.47,35622.94,0,4.0,P000010,Zone_D,IP_10.20.30.173,33,226,1,Electronics
2026-09-08 11:14:23,TX-10070,Shopee,PlayStation 5 Slim 1TB,Gaming & Consoles,2,18199.11,36398.22,0,4.5,P000006,Zone_B,IP_10.20.30.162,139,224,3,Fashion
2026-09-08 12:02:23,TX-10071,Lazada,DJI Osmo Pocket 3 Creator Combo,Cameras & Photography,1,18712.75,18712.75,0,5.0,P000010,Zone_A,IP_10.20.30.171,48,133,1,Electronics
2026-09-08 13:53:31,TX-10072,Lazada,DJI Osmo Pocket 3 Creator Combo,Cameras & Photography,2,18090.05,36180.10,0,3.0,P000010,Zone_D,IP_10.20.30.186,61,131,4,Electronics
2026-09-08 17:37:14,TX-10073,Shopee,PlayStation 5 Slim 1TB,Gaming & Consoles,1,18387.13,18387.13,0,4.5,P000006,Zone_C,IP_10.20.30.182,166,195,1,Fashion
2026-09-08 21:21:09,TX-10074,TikTok Shop,iPhone 15 Pro Max 256GB,Smartphones & Tablets,5,40585.09,202925.45,0,4.5,P000001,Zone_B,IP_10.20.30.152,41,243,5,Electronics
2026-09-08 22:49:36,TX-10075,TikTok Shop,Logitech MX Master 3S Mouse,Computer Peripherals,1,3946.07,3946.07,0,5.0,P000004,Zone_D,IP_10.20.30.168,168,117,1,Fashion
2026-09-09 01:53:22,TX-10076,Lazada,DJI Osmo Pocket 3 Creator Combo,Cameras & Photography,2,17646.11,35292.22,0,4.0,P000010,Zone_A,IP_10.20.30.172,75,210,5,Electronics
2026-09-09 01:59:36,TX-10077,Shopee,PlayStation 5 Slim 1TB,Gaming & Consoles,1,18169.62,18169.62,0,4.5,P000006,Zone_C,IP_10.20.30.178,148,176,5,Fashion
2026-09-09 11:23:00,TX-10078,Shopee,PlayStation 5 Slim 1TB,Gaming & Consoles,5,19224.27,96121.35,0,5.0,P000006,Zone_B,IP_10.20.30.179,45,213,5,Fashion
2026-09-09 14:39:34,TX-10079,Shopee,iPad Air 6 M2 WiFi,Smartphones & Tablets,2,23948.54,47897.08,0,5.0,P000005,Zone_B,IP_10.20.30.188,158,131,4,Electronics
2026-09-09 20:35:13,TX-10080,TikTok Shop,iPhone 15 Pro Max 256GB,Smartphones & Tablets,2,40986.55,81973.10,0,4.5,P000001,Zone_D,IP_10.20.30.174,92,196,1,Electronics
2026-09-09 21:17:16,TX-10081,Lazada,Nintendo Switch OLED Model,Gaming & Consoles,1,13928.03,13928.03,0,4.5,P000008,Zone_C,IP_10.20.30.186,138,205,1,Electronics
2026-09-09 21:46:38,TX-10082,Shopee,iPad Air 6 M2 WiFi,Smartphones & Tablets,3,24741.71,74225.13,0,4.5,P000005,Zone_C,IP_10.20.30.157,148,217,4,Electronics
2026-09-09 22:05:46,TX-10083,Shopee,iPad Air 6 M2 WiFi,Smartphones & Tablets,1,24024.06,24024.06,0,5.0,P000005,Zone_C,IP_10.20.30.165,50,133,3,Electronics
2026-09-10 01:04:34,TX-10084,Shopee,Keychron K2 V2 Mechanical Keyboard,Computer Peripherals,4,3521.33,14085.32,0,4.5,P000007,Zone_C,IP_10.20.30.157,187,162,2,Home & Living
2026-09-10 02:40:01,TX-10085,TikTok Shop,Logitech MX Master 3S Mouse,Computer Peripherals,1,4046.89,4046.89,0,3.0,P000004,Zone_A,IP_10.20.30.150,42,125,1,Fashion
2026-09-10 03:55:43,TX-10086,Shopee,PlayStation 5 Slim 1TB,Gaming & Consoles,1,18717.58,18717.58,0,5.0,P000006,Zone_C,IP_10.20.30.154,191,171,2,Fashion
2026-09-10 03:59:31,TX-10087,TikTok Shop,Logitech MX Master 3S Mouse,Computer Peripherals,1,3757.27,3757.27,0,4.5,P000004,Zone_B,IP_10.20.30.152,33,192,4,Fashion
2026-09-10 07:13:11,TX-10088,TikTok Shop,AirPods Pro Gen 2 USB-C,Audio & Headphones,2,8480.62,16961.24,0,4.5,P000003,Zone_B,IP_10.20.30.150,185,90,3,Electronics
2026-09-10 07:51:29,TX-10089,Shopee,Keychron K2 V2 Mechanical Keyboard,Computer Peripherals,2,3589.30,7178.60,0,4.0,P000007,Zone_A,IP_10.20.30.153,131,216,3,Home & Living
2026-09-10 09:52:48,TX-10090,Lazada,Nintendo Switch OLED Model,Gaming & Consoles,1,14067.23,14067.23,0,4.5,P000008,Zone_B,IP_10.20.30.189,88,51,3,Electronics
2026-09-10 13:23:36,TX-10091,TikTok Shop,Logitech MX Master 3S Mouse,Computer Peripherals,3,3979.59,11938.77,0,4.0,P000004,Zone_B,IP_10.20.30.184,157,240,4,Fashion
2026-09-10 16:34:51,TX-10092,TikTok Shop,Samsung Galaxy S24 Ultra,Smartphones & Tablets,2,36812.13,73624.26,0,4.5,P000002,Zone_C,IP_10.20.30.181,56,78,5,Home & Living
2026-09-11 02:52:51,TX-10093,Lazada,DJI Osmo Pocket 3 Creator Combo,Cameras & Photography,2,17249.10,34498.20,0,4.0,P000010,Zone_B,IP_10.20.30.183,98,154,5,Electronics
2026-09-11 03:50:44,TX-10094,TikTok Shop,AirPods Pro Gen 2 USB-C,Audio & Headphones,2,8467.94,16935.88,0,4.5,P000003,Zone_A,IP_10.20.30.174,54,243,2,Electronics
2026-09-11 06:25:21,TX-10095,TikTok Shop,iPhone 15 Pro Max 256GB,Smartphones & Tablets,2,39303.84,78607.68,0,5.0,P000001,Zone_C,IP_10.20.30.159,160,100,5,Electronics
2026-09-11 09:09:02,TX-10096,Lazada,Nintendo Switch OLED Model,Gaming & Consoles,2,14024.99,28049.98,0,3.0,P000008,Zone_D,IP_10.20.30.170,126,124,5,Electronics
2026-09-11 09:17:01,TX-10097,TikTok Shop,AirPods Pro Gen 2 USB-C,Audio & Headphones,1,8804.10,8804.10,0,5.0,P000003,Zone_C,IP_10.20.30.188,54,59,3,Electronics
2026-09-11 12:01:57,TX-10098,Lazada,DJI Osmo Pocket 3 Creator Combo,Cameras & Photography,1,17788.08,17788.08,0,4.5,P000010,Zone_A,IP_10.20.30.176,177,191,3,Electronics
2026-09-11 12:58:01,TX-10099,Shopee,Keychron K2 V2 Mechanical Keyboard,Computer Peripherals,4,3641.46,14565.84,0,5.0,P000007,Zone_C,IP_10.20.30.176,191,100,2,Home & Living
2026-09-11 13:28:15,TX-10100,Lazada,DJI Osmo Pocket 3 Creator Combo,Cameras & Photography,4,17628.38,70513.52,0,5.0,P000010,Zone_C,IP_10.20.30.151,183,167,1,Electronics
2026-09-11 14:44:00,TX-10101,Shopee,iPad Air 6 M2 WiFi,Smartphones & Tablets,1,23933.43,23933.43,0,4.5,P000005,Zone_A,IP_10.20.30.162,155,170,2,Electronics
2026-09-11 21:05:03,TX-10102,Lazada,DJI Osmo Pocket 3 Creator Combo,Cameras & Photography,1,18407.74,18407.74,1,5.0,P000010,Zone_C,IP_10.20.30.158,162,88,2,Electronics
2026-09-12 00:47:57,TX-10103,Shopee,iPad Air 6 M2 WiFi,Smartphones & Tablets,2,23652.74,47305.48,0,5.0,P000005,Zone_A,IP_10.20.30.185,38,77,4,Electronics
2026-09-12 06:25:48,TX-10104,Shopee,Keychron K2 V2 Mechanical Keyboard,Computer Peripherals,2,3542.73,7085.46,0,4.5,P000007,Zone_A,IP_10.20.30.171,145,52,4,Home & Living
2026-09-12 07:52:12,TX-10105,Lazada,Sony WH-1000XM5 ANC Headphone,Audio & Headphones,1,13367.45,13367.45,0,4.0,P000009,Zone_D,IP_10.20.30.175,163,133,2,Electronics
2026-09-12 09:25:46,TX-10106,Shopee,iPad Air 6 M2 WiFi,Smartphones & Tablets,1,24974.35,24974.35,0,4.5,P000005,Zone_B,IP_10.20.30.161,89,247,2,Electronics
2026-09-12 10:50:36,TX-10107,TikTok Shop,iPhone 15 Pro Max 256GB,Smartphones & Tablets,3,38491.82,115475.46,0,5.0,P000001,Zone_B,IP_10.20.30.166,150,204,2,Electronics
2026-09-12 11:03:18,TX-10108,Lazada,DJI Osmo Pocket 3 Creator Combo,Cameras & Photography,2,18663.59,37327.18,0,5.0,P000010,Zone_C,IP_10.20.30.163,168,166,5,Electronics
2026-09-12 12:41:47,TX-10109,Lazada,DJI Osmo Pocket 3 Creator Combo,Cameras & Photography,1,17885.89,17885.89,0,5.0,P000010,Zone_C,IP_10.20.30.163,137,51,4,Electronics
2026-09-12 13:33:58,TX-10110,TikTok Shop,iPhone 15 Pro Max 256GB,Smartphones & Tablets,1,38935.40,38935.40,0,4.5,P000001,Zone_D,IP_10.20.30.183,137,142,2,Electronics
2026-09-12 15:48:13,TX-10111,TikTok Shop,Samsung Galaxy S24 Ultra,Smartphones & Tablets,1,37745.12,37745.12,1,5.0,P000002,Zone_D,IP_10.20.30.169,160,215,3,Home & Living
2026-09-12 17:29:03,TX-10112,Shopee,PlayStation 5 Slim 1TB,Gaming & Consoles,2,19807.26,39614.52,0,4.0,P000006,Zone_D,IP_10.20.30.160,105,180,3,Fashion
2026-09-12 18:30:26,TX-10113,Lazada,Sony WH-1000XM5 ANC Headphone,Audio & Headphones,1,12890.48,12890.48,0,4.5,P000009,Zone_A,IP_10.20.30.165,59,193,5,Electronics
2026-09-13 02:46:37,TX-10114,Lazada,Nintendo Switch OLED Model,Gaming & Consoles,1,13661.96,13661.96,0,3.0,P000008,Zone_D,IP_10.20.30.180,50,143,5,Electronics
2026-09-13 05:32:11,TX-10115,Shopee,iPad Air 6 M2 WiFi,Smartphones & Tablets,3,24218.83,72656.49,0,4.0,P000005,Zone_D,IP_10.20.30.155,185,89,1,Electronics
2026-09-13 10:01:16,TX-10116,TikTok Shop,iPhone 15 Pro Max 256GB,Smartphones & Tablets,1,38863.18,38863.18,0,4.0,P000001,Zone_C,IP_10.20.30.168,190,51,1,Electronics
2026-09-13 11:45:11,TX-10117,Shopee,Keychron K2 V2 Mechanical Keyboard,Computer Peripherals,2,3351.55,6703.10,0,4.0,P000007,Zone_D,IP_10.20.30.186,192,130,1,Home & Living
2026-09-13 17:09:51,TX-10118,Shopee,iPad Air 6 M2 WiFi,Smartphones & Tablets,1,23013.02,23013.02,0,4.5,P000005,Zone_A,IP_10.20.30.153,63,218,5,Electronics
2026-09-13 19:37:27,TX-10119,Shopee,PlayStation 5 Slim 1TB,Gaming & Consoles,1,18197.01,18197.01,0,4.0,P000006,Zone_A,IP_10.20.30.153,70,61,5,Fashion
2026-09-13 22:50:43,TX-10120,Shopee,Keychron K2 V2 Mechanical Keyboard,Computer Peripherals,1,3378.17,3378.17,0,4.5,P000007,Zone_C,IP_10.20.30.169,80,212,5,Home & Living
2026-09-14 00:48:01,TX-10121,TikTok Shop,AirPods Pro Gen 2 USB-C,Audio & Headphones,3,8578.56,25735.68,0,4.0,P000003,Zone_D,IP_10.20.30.159,111,114,3,Electronics
2026-09-14 03:34:34,TX-10122,Lazada,DJI Osmo Pocket 3 Creator Combo,Cameras & Photography,4,18152.17,72608.68,0,4.0,P000010,Zone_D,IP_10.20.30.173,87,104,5,Electronics
2026-09-14 04:20:48,TX-10123,TikTok Shop,AirPods Pro Gen 2 USB-C,Audio & Headphones,3,8616.87,25850.61,0,4.0,P000003,Zone_A,IP_10.20.30.184,104,94,3,Electronics
2026-09-14 08:40:54,TX-10124,Shopee,iPad Air 6 M2 WiFi,Smartphones & Tablets,1,23531.14,23531.14,0,3.0,P000005,Zone_D,IP_10.20.30.175,52,150,1,Electronics
2026-09-14 12:22:32,TX-10125,Unspecified,PlayStation 5 Slim 1TB,Gaming & Consoles,2,19649.93,39299.86,0,4.5,P000006,Zone_D,IP_10.20.30.186,157,111,1,Fashion
2026-09-14 21:44:42,TX-10126,Lazada,Sony WH-1000XM5 ANC Headphone,Audio & Headphones,1,12866.41,12866.41,0,4.5,P000009,Zone_D,IP_10.20.30.187,179,98,1,Electronics
2026-09-14 23:15:14,TX-10127,Shopee,iPad Air 6 M2 WiFi,Smartphones & Tablets,1,24300.46,24300.46,1,4.5,P000005,Zone_B,IP_10.20.30.170,46,176,2,Electronics
2026-09-15 01:04:35,TX-10128,TikTok Shop,iPhone 15 Pro Max 256GB,Smartphones & Tablets,4,38592.56,154370.24,1,4.5,P000001,Zone_C,IP_10.20.30.189,98,202,2,Electronics
2026-09-15 03:00:05,TX-10129,TikTok Shop,Logitech MX Master 3S Mouse,Computer Peripherals,1,3779.99,3779.99,0,4.0,P000004,Zone_B,IP_10.20.30.188,137,72,4,Fashion
2026-09-15 08:25:11,TX-10130,Shopee,iPad Air 6 M2 WiFi,Smartphones & Tablets,1,22802.68,22802.68,0,5.0,P000005,Zone_C,IP_10.20.30.170,168,201,4,Electronics
2026-09-15 08:44:42,TX-10131,Lazada,DJI Osmo Pocket 3 Creator Combo,Cameras & Photography,1,17307.39,17307.39,0,4.5,P000010,Zone_A,IP_10.20.30.159,123,87,4,Electronics
2026-09-15 14:45:52,TX-10132,Lazada,DJI Osmo Pocket 3 Creator Combo,Cameras & Photography,1,17503.68,17503.68,0,4.5,P000010,Zone_D,IP_10.20.30.187,44,77,2,Electronics
2026-09-15 17:15:41,TX-10133,Shopee,iPad Air 6 M2 WiFi,Smartphones & Tablets,1,23128.06,23128.06,0,3.0,P000005,Zone_C,IP_10.20.30.153,120,70,2,Electronics
2026-09-15 20:35:43,TX-10134,Shopee,Keychron K2 V2 Mechanical Keyboard,Computer Peripherals,2,3356.05,6712.10,0,4.0,P000007,Zone_B,IP_10.20.30.169,192,231,4,Home & Living
2026-09-15 20:59:20,TX-10135,TikTok Shop,Logitech MX Master 3S Mouse,Computer Peripherals,2,3752.05,7504.10,0,4.0,P000004,Zone_D,IP_10.20.30.166,62,156,4,Fashion
2026-09-16 02:36:56,TX-10136,TikTok Shop,iPhone 15 Pro Max 256GB,Smartphones & Tablets,4,39743.51,158974.04,0,4.0,P000001,Zone_A,IP_10.20.30.156,154,195,5,Electronics
2026-09-16 02:46:42,TX-10137,Shopee,iPad Air 6 M2 WiFi,Smartphones & Tablets,3,23198.14,69594.42,0,4.5,P000005,Zone_C,IP_10.20.30.153,45,213,4,Electronics
2026-09-16 03:09:31,TX-10138,Shopee,Keychron K2 V2 Mechanical Keyboard,Computer Peripherals,1,3452.49,3452.49,0,4.5,P000007,Zone_C,IP_10.20.30.178,191,148,5,Home & Living
2026-09-16 04:22:16,TX-10139,Lazada,DJI Osmo Pocket 3 Creator Combo,Cameras & Photography,1,17906.12,17906.12,0,4.5,P000010,Zone_C,IP_10.20.30.163,95,222,3,Electronics
2026-09-16 07:08:05,TX-10140,Lazada,DJI Osmo Pocket 3 Creator Combo,Cameras & Photography,1,18240.81,18240.81,1,5.0,P000010,Zone_D,IP_10.20.30.152,197,168,2,Electronics
2026-09-16 07:28:25,TX-10141,Shopee,PlayStation 5 Slim 1TB,Gaming & Consoles,2,18029.30,36058.60,0,5.0,P000006,Zone_B,IP_10.20.30.173,185,122,4,Fashion
2026-09-16 18:00:28,TX-10142,Shopee,iPad Air 6 M2 WiFi,Smartphones & Tablets,1,24615.59,24615.59,0,5.0,P000005,Zone_B,IP_10.20.30.186,76,230,2,Electronics
2026-09-16 18:48:35,TX-10143,TikTok Shop,Logitech MX Master 3S Mouse,Computer Peripherals,2,3949.88,7899.76,0,5.0,P000004,Zone_C,IP_10.20.30.165,196,171,2,Fashion
2026-09-16 20:40:55,TX-10144,TikTok Shop,Samsung Galaxy S24 Ultra,Smartphones & Tablets,2,36314.87,72629.74,0,3.0,P000002,Zone_A,IP_10.20.30.153,177,79,2,Home & Living
2026-09-17 00:30:50,TX-10145,TikTok Shop,Logitech MX Master 3S Mouse,Computer Peripherals,2,4045.70,8091.40,0,4.0,P000004,Zone_A,IP_10.20.30.173,153,237,3,Fashion
2026-09-17 03:47:05,TX-10146,Lazada,DJI Osmo Pocket 3 Creator Combo,Cameras & Photography,2,18653.36,37306.72,0,3.0,P000010,Zone_B,IP_10.20.30.183,30,157,1,Electronics
2026-09-17 05:06:44,TX-10147,Lazada,DJI Osmo Pocket 3 Creator Combo,Cameras & Photography,1,17114.33,17114.33,0,4.5,P000010,Zone_A,IP_10.20.30.179,116,147,4,Electronics
2026-09-17 05:28:27,TX-10148,TikTok Shop,AirPods Pro Gen 2 USB-C,Audio & Headphones,4,8701.42,34805.68,0,5.0,P000003,Zone_B,IP_10.20.30.167,157,81,1,Electronics
2026-09-17 06:01:44,TX-10149,Lazada,DJI Osmo Pocket 3 Creator Combo,Cameras & Photography,3,18448.10,55344.30,0,4.0,P000010,Zone_C,IP_10.20.30.168,96,244,1,Electronics
2026-09-17 08:54:07,TX-10150,TikTok Shop,iPhone 15 Pro Max 256GB,Smartphones & Tablets,1,40890.56,40890.56,0,5.0,P000001,Zone_B,IP_10.20.30.180,33,244,1,Electronics
2026-09-17 10:25:45,TX-10151,Lazada,Nintendo Switch OLED Model,Gaming & Consoles,4,13461.48,53845.92,1,3.0,P000008,Zone_B,IP_10.20.30.168,182,205,2,Electronics
2026-09-17 11:57:52,TX-10152,Shopee,iPad Air 6 M2 WiFi,Smartphones & Tablets,2,23205.34,46410.68,0,5.0,P000005,Zone_C,IP_10.20.30.168,76,221,5,Electronics
2026-09-17 13:07:06,TX-10153,TikTok Shop,Logitech MX Master 3S Mouse,Computer Peripherals,4,3849.48,15397.92,0,4.0,P000004,Zone_A,IP_10.20.30.171,67,128,2,Fashion
2026-09-17 21:32:13,TX-10154,Lazada,Nintendo Switch OLED Model,Gaming & Consoles,3,13878.49,41635.47,0,4.0,P000008,Zone_B,IP_10.20.30.173,172,90,2,Electronics
2026-09-17 23:08:09,TX-10155,Shopee,Keychron K2 V2 Mechanical Keyboard,Computer Peripherals,2,3541.39,7082.78,0,4.5,P000007,Zone_B,IP_10.20.30.161,50,112,1,Home & Living
2026-09-17 23:29:36,TX-10156,TikTok Shop,Samsung Galaxy S24 Ultra,Smartphones & Tablets,1,37403.18,37403.18,0,4.0,P000002,Zone_C,IP_10.20.30.179,86,72,2,Home & Living
2026-09-18 00:28:05,TX-10157,TikTok Shop,iPhone 15 Pro Max 256GB,Smartphones & Tablets,1,39750.51,39750.51,0,4.0,P000001,Zone_A,IP_10.20.30.187,146,153,1,Electronics
2026-09-18 00:38:11,TX-10158,TikTok Shop,Logitech MX Master 3S Mouse,Computer Peripherals,2,3996.51,7993.02,0,4.0,P000004,Zone_B,IP_10.20.30.180,75,124,5,Fashion
2026-09-18 03:13:35,TX-10159,Lazada,Nintendo Switch OLED Model,Gaming & Consoles,2,13255.99,26511.98,1,5.0,P000008,Zone_C,IP_10.20.30.185,171,97,4,Electronics
2026-09-18 07:36:16,TX-10160,TikTok Shop,Samsung Galaxy S24 Ultra,Smartphones & Tablets,1,36961.74,36961.74,0,4.5,P000002,Zone_B,IP_10.20.30.168,174,209,1,Home & Living
2026-09-18 08:55:42,TX-10161,TikTok Shop,AirPods Pro Gen 2 USB-C,Audio & Headphones,1,9089.88,9089.88,0,4.0,P000003,Zone_D,IP_10.20.30.185,68,106,5,Electronics
2026-09-18 09:32:45,TX-10162,TikTok Shop,iPhone 15 Pro Max 256GB,Smartphones & Tablets,3,41476.88,124430.64,0,4.5,P000001,Zone_C,IP_10.20.30.179,166,167,4,Electronics
2026-09-18 09:53:04,TX-10163,TikTok Shop,iPhone 15 Pro Max 256GB,Smartphones & Tablets,5,39946.59,199732.95,0,5.0,P000001,Zone_A,IP_10.20.30.182,128,149,3,Electronics
2026-09-18 10:59:09,TX-10164,TikTok Shop,AirPods Pro Gen 2 USB-C,Audio & Headphones,2,8928.58,17857.16,0,4.0,P000003,Zone_A,IP_10.20.30.167,106,173,1,Electronics
2026-09-18 13:59:23,TX-10165,Shopee,iPad Air 6 M2 WiFi,Smartphones & Tablets,1,22961.14,22961.14,0,4.5,P000005,Zone_A,IP_10.20.30.177,144,210,1,Electronics
2026-09-18 14:31:41,TX-10166,TikTok Shop,AirPods Pro Gen 2 USB-C,Audio & Headphones,1,8853.20,8853.20,0,4.0,P000003,Zone_A,IP_10.20.30.160,163,201,3,Electronics
2026-09-18 14:41:41,TX-10167,TikTok Shop,iPhone 15 Pro Max 256GB,Smartphones & Tablets,1,40030.14,40030.14,0,4.0,P000001,Zone_B,IP_10.20.30.182,180,216,3,Electronics
2026-09-18 17:21:06,TX-10168,TikTok Shop,iPhone 15 Pro Max 256GB,Smartphones & Tablets,4,38872.46,155489.84,0,4.5,P000001,Zone_B,IP_10.20.30.166,120,83,1,Electronics
2026-09-18 22:12:42,TX-10169,Lazada,Nintendo Switch OLED Model,Gaming & Consoles,1,13579.25,13579.25,1,4.0,P000008,Zone_A,IP_10.20.30.155,127,233,3,Electronics
2026-09-19 01:48:49,TX-10170,Lazada,DJI Osmo Pocket 3 Creator Combo,Cameras & Photography,2,17680.34,35360.68,0,4.5,P000010,Zone_A,IP_10.20.30.153,149,205,2,Electronics
2026-09-19 04:06:46,TX-10171,TikTok Shop,Samsung Galaxy S24 Ultra,Smartphones & Tablets,1,36081.07,36081.07,0,5.0,P000002,Zone_A,IP_10.20.30.169,75,214,4,Home & Living
2026-09-19 05:39:17,TX-10172,TikTok Shop,AirPods Pro Gen 2 USB-C,Audio & Headphones,2,8741.65,17483.30,0,4.0,P000003,Zone_B,IP_10.20.30.176,67,56,4,Electronics
2026-09-19 06:39:19,TX-10173,TikTok Shop,Samsung Galaxy S24 Ultra,Smartphones & Tablets,2,36806.39,73612.78,0,4.5,P000002,Zone_A,IP_10.20.30.164,171,245,4,Home & Living
2026-09-19 08:06:38,TX-10174,TikTok Shop,AirPods Pro Gen 2 USB-C,Audio & Headphones,3,8746.47,26239.41,0,4.0,P000003,Zone_A,IP_10.20.30.155,129,214,2,Electronics
2026-09-19 09:06:55,TX-10175,Shopee,Keychron K2 V2 Mechanical Keyboard,Computer Peripherals,1,3366.92,3366.92,0,5.0,P000007,Zone_D,IP_10.20.30.163,101,105,3,Home & Living
2026-09-19 14:33:38,TX-10176,TikTok Shop,iPhone 15 Pro Max 256GB,Smartphones & Tablets,1,41458.20,41458.20,0,4.5,P000001,Zone_D,IP_10.20.30.160,64,114,5,Electronics
2026-09-19 15:28:28,TX-10177,Lazada,DJI Osmo Pocket 3 Creator Combo,Cameras & Photography,1,18067.53,18067.53,0,5.0,P000010,Zone_A,IP_10.20.30.188,176,242,3,Electronics
2026-09-19 18:03:17,TX-10178,Lazada,Nintendo Switch OLED Model,Gaming & Consoles,4,14148.95,56595.80,0,4.5,P000008,Zone_C,IP_10.20.30.158,59,96,1,Electronics
2026-09-19 20:11:20,TX-10179,Lazada,DJI Osmo Pocket 3 Creator Combo,Cameras & Photography,4,18417.62,73670.48,0,3.0,P000010,Zone_A,IP_10.20.30.175,107,197,4,Electronics
2026-09-20 04:47:25,TX-10180,Lazada,DJI Osmo Pocket 3 Creator Combo,Cameras & Photography,2,17897.21,35794.42,0,4.5,P000010,Zone_D,IP_10.20.30.165,113,68,3,Electronics
2026-09-20 04:51:06,TX-10181,Lazada,DJI Osmo Pocket 3 Creator Combo,Cameras & Photography,2,17160.59,34321.18,0,5.0,P000010,Zone_C,IP_10.20.30.154,142,206,5,Electronics
2026-09-20 04:54:40,TX-10182,TikTok Shop,Samsung Galaxy S24 Ultra,Smartphones & Tablets,2,38040.63,76081.26,0,4.5,P000002,Zone_C,IP_10.20.30.159,54,237,1,Home & Living
2026-09-20 05:38:29,TX-10183,TikTok Shop,AirPods Pro Gen 2 USB-C,Audio & Headphones,1,8977.29,8977.29,0,5.0,P000003,Zone_A,IP_10.20.30.152,197,195,2,Electronics
2026-09-20 14:12:23,TX-10184,Lazada,Sony WH-1000XM5 ANC Headphone,Audio & Headphones,4,13216.62,52866.48,0,5.0,P000009,Zone_D,IP_10.20.30.162,117,212,2,Electronics
2026-09-20 14:41:30,TX-10185,Shopee,Keychron K2 V2 Mechanical Keyboard,Computer Peripherals,2,3476.08,6952.16,0,4.5,P000007,Zone_D,IP_10.20.30.179,43,220,5,Home & Living
2026-09-20 16:34:00,TX-10186,TikTok Shop,Logitech MX Master 3S Mouse,Computer Peripherals,1,3754.76,3754.76,0,4.0,P000004,Zone_C,IP_10.20.30.155,183,175,1,Fashion
2026-09-20 18:25:23,TX-10187,Lazada,DJI Osmo Pocket 3 Creator Combo,Cameras & Photography,2,17512.96,35025.92,0,4.5,P000010,Zone_A,IP_10.20.30.166,131,188,4,Electronics
2026-09-21 02:31:35,TX-10188,Shopee,iPad Air 6 M2 WiFi,Smartphones & Tablets,1,23572.77,23572.77,0,4.5,P000005,Zone_B,IP_10.20.30.168,179,98,3,Electronics
2026-09-21 03:38:13,TX-10189,TikTok Shop,Samsung Galaxy S24 Ultra,Smartphones & Tablets,1,38453.03,38453.03,0,5.0,P000002,Zone_B,IP_10.20.30.184,112,162,1,Home & Living
2026-09-21 06:42:06,TX-10190,Lazada,Nintendo Switch OLED Model,Gaming & Consoles,3,13998.38,41995.14,0,5.0,P000008,Zone_D,IP_10.20.30.175,139,87,2,Electronics
2026-09-21 06:44:50,TX-10191,TikTok Shop,Logitech MX Master 3S Mouse,Computer Peripherals,1,3843.88,3843.88,0,4.0,P000004,Zone_B,IP_10.20.30.154,160,113,5,Fashion
2026-09-21 10:48:11,TX-10192,Lazada,Sony WH-1000XM5 ANC Headphone,Audio & Headphones,2,13527.60,27055.20,0,4.0,P000009,Zone_D,IP_10.20.30.178,199,118,5,Electronics
2026-09-21 11:00:40,TX-10193,Shopee,iPad Air 6 M2 WiFi,Smartphones & Tablets,1,24152.80,24152.80,0,5.0,P000005,Zone_D,IP_10.20.30.186,48,185,3,Electronics
2026-09-21 12:36:55,TX-10194,Lazada,Sony WH-1000XM5 ANC Headphone,Audio & Headphones,1,12561.02,12561.02,0,4.0,P000009,Zone_D,IP_10.20.30.169,57,211,5,Electronics
2026-09-21 13:57:06,TX-10195,TikTok Shop,Logitech MX Master 3S Mouse,Computer Peripherals,1,3744.70,3744.70,0,5.0,P000004,Zone_B,IP_10.20.30.170,100,225,5,Fashion
2026-09-21 16:05:54,TX-10196,Lazada,DJI Osmo Pocket 3 Creator Combo,Cameras & Photography,1,17278.62,17278.62,0,4.5,P000010,Zone_D,IP_10.20.30.159,92,165,1,Electronics
2026-09-21 19:39:52,TX-10197,Shopee,iPad Air 6 M2 WiFi,Smartphones & Tablets,3,23292.84,69878.52,0,4.5,P000005,Zone_C,IP_10.20.30.154,102,233,4,Electronics
2026-09-22 03:06:13,TX-10198,Lazada,Sony WH-1000XM5 ANC Headphone,Audio & Headphones,1,12462.28,12462.28,0,4.8,P000009,Zone_A,IP_10.20.30.185,153,114,3,Electronics
2026-09-22 03:07:45,TX-10199,Lazada,Nintendo Switch OLED Model,Gaming & Consoles,2,13464.33,26928.66,0,4.5,P000008,Zone_A,IP_10.20.30.155,148,80,1,Electronics
2026-09-22 06:45:56,TX-10200,TikTok Shop,AirPods Pro Gen 2 USB-C,Audio & Headphones,2,8708.73,17417.46,0,4.5,P000003,Zone_D,IP_10.20.30.175,150,181,4,Electronics
2026-09-22 08:03:20,TX-10201,TikTok Shop,iPhone 15 Pro Max 256GB,Smartphones & Tablets,2,38596.76,77193.52,0,4.5,P000001,Zone_A,IP_10.20.30.153,48,162,1,Electronics
2026-09-22 09:06:31,TX-10202,TikTok Shop,AirPods Pro Gen 2 USB-C,Audio & Headphones,4,9253.12,37012.48,0,4.0,P000003,Zone_B,IP_10.20.30.188,171,158,1,Electronics
2026-09-22 11:48:46,TX-10203,TikTok Shop,Logitech MX Master 3S Mouse,Computer Peripherals,3,3736.29,11208.87,0,5.0,P000004,Zone_B,IP_10.20.30.188,149,227,5,Fashion
2026-09-22 15:30:30,TX-10204,TikTok Shop,Samsung Galaxy S24 Ultra,Smartphones & Tablets,1,37992.90,37992.90,0,5.0,P000002,Zone_A,IP_10.20.30.184,195,118,4,Home & Living
2026-09-22 15:42:08,TX-10205,TikTok Shop,iPhone 15 Pro Max 256GB,Smartphones & Tablets,1,39542.48,39542.48,0,4.0,P000001,Zone_B,IP_10.20.30.150,90,207,3,Electronics
2026-09-22 19:53:33,TX-10206,Shopee,Keychron K2 V2 Mechanical Keyboard,Computer Peripherals,1,3668.83,3668.83,0,3.0,P000007,Zone_A,IP_10.20.30.173,193,169,3,Home & Living
2026-09-22 19:57:02,TX-10207,Lazada,Nintendo Switch OLED Model,Gaming & Consoles,2,13360.73,26721.46,0,3.0,P000008,Zone_A,IP_10.20.30.185,197,137,4,Electronics
2026-09-23 01:14:39,TX-10208,Shopee,Keychron K2 V2 Mechanical Keyboard,Computer Peripherals,1,3464.25,3464.25,1,4.5,P000007,Zone_A,IP_10.20.30.155,59,236,5,Home & Living
2026-09-23 02:53:41,TX-10209,Shopee,iPad Air 6 M2 WiFi,Smartphones & Tablets,2,25022.03,50044.06,0,4.5,P000005,Zone_D,IP_10.20.30.180,38,116,2,Electronics
2026-09-23 04:07:11,TX-10210,TikTok Shop,iPhone 15 Pro Max 256GB,Smartphones & Tablets,2,41358.37,82716.74,0,4.5,P000001,Zone_A,IP_10.20.30.169,93,124,1,Electronics
2026-09-23 05:11:26,TX-10211,Shopee,Keychron K2 V2 Mechanical Keyboard,Computer Peripherals,1,3610.98,3610.98,0,4.0,P000007,Zone_D,IP_10.20.30.173,190,94,5,Home & Living
2026-09-23 07:40:34,TX-10212,Shopee,Keychron K2 V2 Mechanical Keyboard,Computer Peripherals,3,3415.27,10245.81,0,4.0,P000007,Zone_A,IP_10.20.30.174,149,53,4,Home & Living
2026-09-23 13:11:00,TX-10213,Lazada,Sony WH-1000XM5 ANC Headphone,Audio & Headphones,1,12475.44,12475.44,0,4.5,P000009,Zone_A,IP_10.20.30.185,81,203,1,Electronics
2026-09-23 14:48:29,TX-10214,TikTok Shop,AirPods Pro Gen 2 USB-C,Audio & Headphones,1,9050.09,9050.09,0,4.5,P000003,Zone_A,IP_10.20.30.170,118,204,3,Electronics
2026-09-23 14:52:34,TX-10215,Lazada,Sony WH-1000XM5 ANC Headphone,Audio & Headphones,3,13453.90,40361.70,0,5.0,P000009,Zone_B,IP_10.20.30.179,171,223,2,Electronics
2026-09-23 20:03:10,TX-10216,TikTok Shop,iPhone 15 Pro Max 256GB,Smartphones & Tablets,2,40126.48,80252.96,0,4.0,P000001,Zone_D,IP_10.20.30.173,82,156,3,Electronics
2026-09-23 22:58:29,TX-10217,TikTok Shop,iPhone 15 Pro Max 256GB,Smartphones & Tablets,2,40185.73,80371.46,0,4.5,P000001,Zone_D,IP_10.20.30.179,107,241,4,Electronics
2026-09-24 04:27:54,TX-10218,TikTok Shop,Logitech MX Master 3S Mouse,Computer Peripherals,2,3814.19,7628.38,0,2.0,P000004,Zone_A,IP_10.20.30.171,70,100,1,Fashion
2026-09-24 05:49:47,TX-10219,Lazada,Sony WH-1000XM5 ANC Headphone,Audio & Headphones,1,13247.65,13247.65,0,4.5,P000009,Zone_A,IP_10.20.30.177,97,99,4,Electronics
2026-09-24 06:03:41,TX-10220,Shopee,PlayStation 5 Slim 1TB,Gaming & Consoles,3,18308.51,54925.53,0,5.0,P000006,Zone_B,IP_10.20.30.156,37,55,1,Fashion
2026-09-24 08:11:56,TX-10221,TikTok Shop,AirPods Pro Gen 2 USB-C,Audio & Headphones,3,8743.07,26229.21,0,4.5,P000003,Zone_B,IP_10.20.30.184,31,108,5,Electronics
2026-09-24 08:36:03,TX-10222,TikTok Shop,iPhone 15 Pro Max 256GB,Smartphones & Tablets,2,39602.49,79204.98,0,5.0,P000001,Zone_B,IP_10.20.30.177,134,174,2,Electronics
2026-09-24 09:38:20,TX-10223,TikTok Shop,Logitech MX Master 3S Mouse,Computer Peripherals,1,3902.97,3902.97,0,4.0,P000004,Zone_D,IP_10.20.30.163,154,192,5,Fashion
2026-09-24 10:59:53,TX-10224,Lazada,Sony WH-1000XM5 ANC Headphone,Audio & Headphones,2,12567.71,25135.42,0,4.0,P000009,Zone_D,IP_10.20.30.159,139,79,5,Electronics
2026-09-24 12:49:10,TX-10225,TikTok Shop,AirPods Pro Gen 2 USB-C,Audio & Headphones,1,8557.20,8557.20,0,5.0,P000003,Zone_D,IP_10.20.30.165,115,219,4,Electronics
2026-09-24 12:54:03,TX-10226,Lazada,Sony WH-1000XM5 ANC Headphone,Audio & Headphones,1,13042.70,13042.70,0,4.5,P000009,Zone_A,IP_10.20.30.165,198,171,2,Electronics
2026-09-24 17:38:51,TX-10227,Shopee,Keychron K2 V2 Mechanical Keyboard,Computer Peripherals,4,3426.02,13704.08,0,4.0,P000007,Zone_D,IP_10.20.30.180,149,174,1,Home & Living
2026-09-24 18:59:15,TX-10228,TikTok Shop,Logitech MX Master 3S Mouse,Computer Peripherals,1,3931.68,3931.68,0,3.0,P000004,Zone_C,IP_10.20.30.174,156,86,1,Fashion
2026-09-24 20:31:23,TX-10229,TikTok Shop,AirPods Pro Gen 2 USB-C,Audio & Headphones,5,8592.38,42961.90,0,3.0,P000003,Zone_C,IP_10.20.30.162,45,219,3,Electronics
2026-09-25 02:24:23,TX-10230,Lazada,DJI Osmo Pocket 3 Creator Combo,Cameras & Photography,2,17866.24,35732.48,0,5.0,P000010,Zone_B,IP_10.20.30.155,91,173,1,Electronics
2026-09-25 06:05:05,TX-10231,Shopee,iPad Air 6 M2 WiFi,Smartphones & Tablets,1,23977.89,23977.89,0,4.0,P000005,Zone_D,IP_10.20.30.158,142,150,4,Electronics
2026-09-25 07:20:21,TX-10232,Shopee,iPad Air 6 M2 WiFi,Smartphones & Tablets,2,22828.86,45657.72,0,4.0,P000005,Zone_C,IP_10.20.30.185,187,84,5,Electronics
2026-09-25 10:03:38,TX-10233,TikTok Shop,AirPods Pro Gen 2 USB-C,Audio & Headphones,4,8754.58,35018.32,0,4.0,P000003,Zone_B,IP_10.20.30.169,41,136,5,Electronics
2026-09-25 10:25:38,TX-10234,Lazada,Sony WH-1000XM5 ANC Headphone,Audio & Headphones,3,12428.39,37285.17,0,4.0,P000009,Zone_D,IP_10.20.30.167,64,183,5,Electronics
2026-09-25 12:50:23,TX-10235,TikTok Shop,Logitech MX Master 3S Mouse,Computer Peripherals,3,3729.72,11189.16,0,3.0,P000004,Zone_A,IP_10.20.30.170,40,245,2,Fashion
2026-09-25 13:21:30,TX-10236,Shopee,iPad Air 6 M2 WiFi,Smartphones & Tablets,2,25071.00,50142.00,0,4.5,P000005,Zone_C,IP_10.20.30.153,93,67,1,Electronics
2026-09-25 13:44:51,TX-10237,TikTok Shop,Logitech MX Master 3S Mouse,Computer Peripherals,2,3830.72,7661.44,0,3.0,P000004,Zone_A,IP_10.20.30.182,79,162,4,Fashion
2026-09-25 15:30:00,TX-10238,Shopee,iPad Air 6 M2 WiFi,Smartphones & Tablets,3,24640.60,73921.80,0,5.0,P000005,Zone_D,IP_10.20.30.176,178,78,2,Electronics
2026-09-25 17:13:39,TX-10239,Shopee,Keychron K2 V2 Mechanical Keyboard,Computer Peripherals,1,3414.12,3414.12,0,4.0,P000007,Zone_C,IP_10.20.30.156,98,126,3,Home & Living
2026-09-25 17:57:22,TX-10240,Lazada,Sony WH-1000XM5 ANC Headphone,Audio & Headphones,2,13134.14,26268.28,0,4.5,P000009,Zone_D,IP_10.20.30.155,77,108,4,Electronics
2026-09-25 20:53:35,TX-10241,Shopee,Keychron K2 V2 Mechanical Keyboard,Computer Peripherals,1,3591.08,3591.08,0,5.0,P000007,Zone_A,IP_10.20.30.164,49,224,4,Home & Living
2026-09-26 00:19:56,TX-10242,Shopee,iPad Air 6 M2 WiFi,Smartphones & Tablets,5,24128.58,120642.90,0,4.5,P000005,Zone_C,IP_10.20.30.167,130,175,4,Electronics
2026-09-26 06:07:28,TX-10243,Lazada,DJI Osmo Pocket 3 Creator Combo,Cameras & Photography,4,17849.12,71396.48,0,4.5,P000010,Zone_A,IP_10.20.30.181,190,194,5,Electronics
2026-09-26 12:08:02,TX-10244,Lazada,DJI Osmo Pocket 3 Creator Combo,Cameras & Photography,1,17742.20,17742.20,0,4.0,P000010,Zone_D,IP_10.20.30.160,166,158,4,Electronics
2026-09-26 12:24:24,TX-10245,Shopee,Keychron K2 V2 Mechanical Keyboard,Computer Peripherals,3,3447.10,10341.30,0,4.0,P000007,Zone_D,IP_10.20.30.169,97,71,1,Home & Living
2026-09-26 13:01:43,TX-10246,Lazada,DJI Osmo Pocket 3 Creator Combo,Cameras & Photography,4,18668.86,74675.44,0,4.5,P000010,Zone_A,IP_10.20.30.173,64,117,4,Electronics
2026-09-26 13:48:19,TX-10247,Shopee,iPad Air 6 M2 WiFi,Smartphones & Tablets,1,24690.18,24690.18,0,5.0,P000005,Zone_C,IP_10.20.30.164,94,118,5,Electronics
2026-09-26 15:26:43,TX-10248,TikTok Shop,AirPods Pro Gen 2 USB-C,Audio & Headphones,2,9313.87,18627.74,0,4.5,P000003,Zone_A,IP_10.20.30.156,37,214,4,Electronics
2026-09-26 16:25:10,TX-10249,Shopee,Keychron K2 V2 Mechanical Keyboard,Computer Peripherals,4,3368.50,13474.00,0,4.5,P000007,Zone_D,IP_10.20.30.170,74,98,3,Home & Living
2026-09-26 17:26:49,TX-10250,TikTok Shop,Samsung Galaxy S24 Ultra,Smartphones & Tablets,1,38774.99,38774.99,0,5.0,P000002,Zone_A,IP_10.20.30.175,116,190,3,Home & Living
2026-09-26 19:11:24,TX-10251,Lazada,Sony WH-1000XM5 ANC Headphone,Audio & Headphones,2,13465.46,26930.92,0,4.5,P000009,Zone_D,IP_10.20.30.163,197,211,5,Electronics
2026-09-26 19:41:59,TX-10252,Lazada,DJI Osmo Pocket 3 Creator Combo,Cameras & Photography,1,17329.41,17329.41,0,3.0,P000010,Zone_A,IP_10.20.30.186,105,158,1,Electronics
2026-09-26 19:54:20,TX-10253,Lazada,DJI Osmo Pocket 3 Creator Combo,Cameras & Photography,4,17124.03,68496.12,0,4.5,P000010,Zone_C,IP_10.20.30.170,105,135,1,Electronics
2026-09-26 19:56:25,TX-10254,TikTok Shop,iPhone 15 Pro Max 256GB,Smartphones & Tablets,5,40862.07,204310.35,0,5.0,P000001,Zone_C,IP_10.20.30.167,76,102,2,Electronics
2026-09-26 20:41:29,TX-10255,Shopee,PlayStation 5 Slim 1TB,Gaming & Consoles,4,19040.75,76163.00,1,4.0,P000006,Zone_A,IP_10.20.30.154,44,172,5,Fashion
2026-09-26 20:50:00,TX-10256,Shopee,Keychron K2 V2 Mechanical Keyboard,Computer Peripherals,2,3619.64,7239.28,0,4.5,P000007,Zone_A,IP_10.20.30.152,134,136,4,Home & Living
2026-09-27 02:04:42,TX-10257,Lazada,Nintendo Switch OLED Model,Gaming & Consoles,4,13399.28,53597.12,0,4.0,P000008,Zone_C,IP_10.20.30.172,176,228,5,Electronics
2026-09-27 04:10:00,TX-10258,Lazada,DJI Osmo Pocket 3 Creator Combo,Cameras & Photography,3,18428.53,55285.59,0,4.5,P000010,Zone_D,IP_10.20.30.175,55,180,2,Electronics
2026-09-27 06:17:22,TX-10259,Lazada,Sony WH-1000XM5 ANC Headphone,Audio & Headphones,1,12515.10,12515.10,0,3.0,P000009,Zone_C,IP_10.20.30.186,81,91,5,Electronics
2026-09-27 07:12:35,TX-10260,TikTok Shop,Samsung Galaxy S24 Ultra,Smartphones & Tablets,3,36625.26,109875.78,0,4.5,P000002,Zone_D,IP_10.20.30.173,122,147,5,Home & Living
2026-09-27 09:52:11,TX-10261,Lazada,DJI Osmo Pocket 3 Creator Combo,Cameras & Photography,1,17299.04,17299.04,0,5.0,P000010,Zone_A,IP_10.20.30.168,179,209,2,Electronics
2026-09-27 12:10:27,TX-10262,TikTok Shop,Samsung Galaxy S24 Ultra,Smartphones & Tablets,2,39092.24,78184.48,0,4.0,P000002,Zone_A,IP_10.20.30.174,50,158,1,Home & Living
2026-09-27 14:33:36,TX-10263,Shopee,iPad Air 6 M2 WiFi,Smartphones & Tablets,1,24294.82,24294.82,0,4.5,P000005,Zone_D,IP_10.20.30.170,80,100,4,Electronics
2026-09-27 14:43:55,TX-10264,Shopee,iPad Air 6 M2 WiFi,Smartphones & Tablets,1,23955.13,23955.13,1,5.0,P000005,Zone_A,IP_10.20.30.161,67,134,2,Electronics
2026-09-27 16:23:33,TX-10265,Shopee,PlayStation 5 Slim 1TB,Gaming & Consoles,1,18633.19,18633.19,1,5.0,P000006,Zone_D,IP_10.20.30.182,49,223,3,Fashion
2026-09-27 18:13:07,TX-10266,TikTok Shop,AirPods Pro Gen 2 USB-C,Audio & Headphones,2,9235.71,18471.42,0,4.0,P000003,Zone_B,IP_10.20.30.153,186,176,1,Electronics
2026-09-27 19:22:01,TX-10267,Lazada,Nintendo Switch OLED Model,Gaming & Consoles,1,13750.50,13750.50,0,4.0,P000008,Zone_C,IP_10.20.30.156,161,70,3,Electronics
2026-09-28 04:59:30,TX-10268,TikTok Shop,iPhone 15 Pro Max 256GB,Smartphones & Tablets,3,41163.23,123489.69,0,4.0,P000001,Zone_B,IP_10.20.30.171,84,93,1,Electronics
2026-09-28 05:50:39,TX-10269,Shopee,PlayStation 5 Slim 1TB,Gaming & Consoles,1,18784.96,18784.96,0,5.0,P000006,Zone_D,IP_10.20.30.182,121,188,4,Fashion
2026-09-28 08:04:24,TX-10271,TikTok Shop,iPhone 15 Pro Max 256GB,Smartphones & Tablets,2,39751.09,79502.18,0,4.5,P000001,Zone_D,IP_10.20.30.173,33,117,5,Electronics
2026-09-28 09:24:56,TX-10272,Shopee,Keychron K2 V2 Mechanical Keyboard,Computer Peripherals,3,3430.48,10291.44,0,5.0,P000007,Zone_C,IP_10.20.30.183,179,178,3,Home & Living
2026-09-28 10:31:30,TX-10273,Lazada,Sony WH-1000XM5 ANC Headphone,Audio & Headphones,1,13219.42,13219.42,0,4.5,P000009,Zone_C,IP_10.20.30.177,105,141,1,Electronics
2026-09-28 12:52:06,TX-10274,TikTok Shop,Logitech MX Master 3S Mouse,Computer Peripherals,2,3901.06,7802.12,0,4.5,P000004,Zone_C,IP_10.20.30.188,96,240,4,Fashion
2026-09-28 18:41:10,TX-10275,TikTok Shop,Logitech MX Master 3S Mouse,Computer Peripherals,4,3795.56,15182.24,0,3.0,P000004,Zone_C,IP_10.20.30.171,115,73,2,Fashion
2026-09-28 22:49:36,TX-10276,Shopee,PlayStation 5 Slim 1TB,Gaming & Consoles,2,19655.20,39310.40,0,5.0,P000006,Zone_D,IP_10.20.30.166,191,174,4,Fashion
2026-09-28 23:09:42,TX-10277,TikTok Shop,AirPods Pro Gen 2 USB-C,Audio & Headphones,1,8796.66,8796.66,0,4.0,P000003,Zone_C,IP_10.20.30.183,120,190,2,Electronics
2026-09-29 02:33:08,TX-10278,Shopee,PlayStation 5 Slim 1TB,Gaming & Consoles,1,18982.31,18982.31,0,5.0,P000006,Zone_C,IP_10.20.30.155,134,160,1,Fashion
2026-09-29 07:36:49,TX-10279,Shopee,Keychron K2 V2 Mechanical Keyboard,Computer Peripherals,4,3642.27,14569.08,1,5.0,P000007,Zone_B,IP_10.20.30.155,30,147,4,Home & Living
2026-09-29 12:53:24,TX-10280,Lazada,DJI Osmo Pocket 3 Creator Combo,Cameras & Photography,1,18122.39,18122.39,0,5.0,P000010,Zone_A,IP_10.20.30.183,101,188,4,Electronics
2026-09-29 14:43:09,TX-10281,Lazada,DJI Osmo Pocket 3 Creator Combo,Cameras & Photography,4,17214.25,68857.00,0,3.0,P000010,Zone_A,IP_10.20.30.150,116,228,1,Electronics
2026-09-29 16:05:54,TX-10282,TikTok Shop,AirPods Pro Gen 2 USB-C,Audio & Headphones,10,9291.45,92914.50,0,4.0,P000003,Zone_B,IP_10.20.30.159,195,66,4,Electronics
2026-09-29 18:06:53,TX-10283,Shopee,Keychron K2 V2 Mechanical Keyboard,Computer Peripherals,4,3544.70,14178.80,0,4.0,P000007,Zone_B,IP_10.20.30.170,35,148,2,Home & Living
2026-09-29 18:22:47,TX-10284,TikTok Shop,AirPods Pro Gen 2 USB-C,Audio & Headphones,3,8753.07,26259.21,0,4.0,P000003,Zone_D,IP_10.20.30.154,182,131,4,Electronics
2026-09-30 00:07:55,TX-10285,TikTok Shop,Samsung Galaxy S24 Ultra,Smartphones & Tablets,5,36532.84,182664.20,0,3.0,P000002,Zone_D,IP_10.20.30.151,174,153,3,Home & Living
2026-09-30 01:57:47,TX-10286,Lazada,DJI Osmo Pocket 3 Creator Combo,Cameras & Photography,1,18426.31,18426.31,0,5.0,P000010,Zone_D,IP_10.20.30.171,90,201,5,Electronics
2026-09-30 06:37:47,TX-10287,TikTok Shop,Logitech MX Master 3S Mouse,Computer Peripherals,3,3946.83,11840.49,0,4.5,P000004,Zone_B,IP_10.20.30.151,41,68,2,Fashion
2026-09-30 08:24:53,TX-10288,Lazada,Nintendo Switch OLED Model,Gaming & Consoles,2,13946.51,27893.02,0,4.0,P000008,Zone_B,IP_10.20.30.159,35,214,3,Electronics
2026-09-30 08:36:22,TX-10289,Lazada,Sony WH-1000XM5 ANC Headphone,Audio & Headphones,2,13408.12,26816.24,0,4.0,P000009,Zone_C,IP_10.20.30.183,56,134,1,Electronics
2026-09-30 09:24:08,TX-10290,Shopee,Keychron K2 V2 Mechanical Keyboard,Computer Peripherals,2,3601.01,7202.02,0,4.5,P000007,Zone_D,IP_10.20.30.165,165,57,2,Home & Living
2026-09-30 11:53:41,TX-10291,TikTok Shop,iPhone 15 Pro Max 256GB,Smartphones & Tablets,4,38510.18,154040.72,0,4.5,P000001,Zone_D,IP_10.20.30.188,153,77,5,Electronics
2026-09-30 14:24:49,TX-10293,Lazada,Sony WH-1000XM5 ANC Headphone,Audio & Headphones,3,12575.55,37726.65,0,5.0,P000009,Zone_A,IP_10.20.30.161,122,194,1,Electronics
2026-09-30 14:37:11,TX-10294,TikTok Shop,iPhone 15 Pro Max 256GB,Smartphones & Tablets,2,40873.35,81746.70,0,4.5,P000001,Zone_C,IP_10.20.30.173,138,150,1,Electronics
2026-09-30 18:00:06,TX-10295,Lazada,Sony WH-1000XM5 ANC Headphone,Audio & Headphones,2,12298.26,24596.52,0,5.0,P000009,Zone_D,IP_10.20.30.189,128,213,2,Electronics
2026-09-30 20:05:06,TX-10296,Lazada,Nintendo Switch OLED Model,Gaming & Consoles,3,13997.15,41991.45,0,5.0,P000008,Zone_D,IP_10.20.30.187,197,167,4,Electronics
2026-09-30 21:36:24,TX-10297,TikTok Shop,iPhone 15 Pro Max 256GB,Smartphones & Tablets,1,40947.21,40947.21,0,4.0,P000001,Zone_D,IP_10.20.30.159,171,196,1,Electronics
2026-09-30 22:03:51,TX-10298,Shopee,PlayStation 5 Slim 1TB,Gaming & Consoles,1,19612.09,19612.09,0,5.0,P000006,Zone_A,IP_10.20.30.184,64,113,4,Fashion
2026-09-30 22:30:44,TX-10299,Shopee,iPad Air 6 M2 WiFi,Smartphones & Tablets,1,23522.58,23522.58,0,4.0,P000005,Zone_A,IP_10.20.30.181,113,140,3,Electronics`;

// Parse CSV into Objects
function parseCSV(csv) {
  const lines = csv.trim().split('\n');
  const headers = lines[0].split(',');
  const result = [];
  for (let i = 1; i < lines.length; i++) {
    const currentline = lines[i].split(',');
    if (currentline.length < headers.length) continue;
    const obj = {
      Timestamp: currentline[0],
      Transaction_ID: currentline[1],
      Platform: currentline[2],
      Raw_Product_Name: currentline[3],
      Harmonized_Category: currentline[4],
      Order_Qty: parseInt(currentline[5]),
      Unit_Price_THB: parseFloat(currentline[6]),
      Transaction_Revenue_THB: parseFloat(currentline[7]),
      Is_Defective: parseInt(currentline[8]),
      Customer_Review_Rating: parseFloat(currentline[9]),
      Product_Record_ID: currentline[10],
      Warehouse_Zone: currentline[11],
      System_IP_Node: currentline[12],
      Days_Listed_In_Catalog: parseInt(currentline[13]),
      Estimated_Shipping_Cost: parseFloat(currentline[14]),
      Supplier_Delivery_Days: parseInt(currentline[15]),
      Raw_Category_Tag: currentline[16]
    };
    result.push(obj);
  }
  return result;
}

const ALL_DATA = parseCSV(RAW_CSV_DATA);
let filteredData = [...ALL_DATA];

// Pagination & Table State
let currentPage = 1;
let pageSize = 25;
let currentSortColumn = 'Timestamp';
let currentSortAsc = true;

// Chart Instances
let trendChartInstance = null;
let platformChartInstance = null;
let productChartInstance = null;
let warehouseChartInstance = null;
let edaDistChartInstance = null;
let edaCorrChartInstance = null;

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    lucide.createIcons();
  }
  initDashboard();
});

function initDashboard() {
  applyFilters();
}

// Global Filter Logic
function applyFilters() {
  const platform = document.getElementById('filterPlatform').value;
  const category = document.getElementById('filterCategory').value;
  const zone = document.getElementById('filterZone').value;
  const defect = document.getElementById('filterDefect').value;
  const rating = document.getElementById('filterRating').value;
  const search = document.getElementById('filterSearch').value.trim().toLowerCase();

  filteredData = ALL_DATA.filter(item => {
    if (platform !== 'ALL' && item.Platform !== platform) return false;
    if (category !== 'ALL' && item.Harmonized_Category !== category) return false;
    if (zone !== 'ALL' && item.Warehouse_Zone !== zone) return false;
    if (defect !== 'ALL' && item.Is_Defective.toString() !== defect) return false;
    if (rating !== 'ALL') {
      const minRating = parseFloat(rating);
      if (item.Customer_Review_Rating < minRating) return false;
    }
    if (search !== '') {
      const matchId = item.Transaction_ID.toLowerCase().includes(search);
      const matchProd = item.Raw_Product_Name.toLowerCase().includes(search);
      const matchCat = item.Harmonized_Category.toLowerCase().includes(search);
      const matchZone = item.Warehouse_Zone.toLowerCase().includes(search);
      if (!matchId && !matchProd && !matchCat && !matchZone) return false;
    }
    return true;
  });

  currentPage = 1;
  updateUI();
}

function resetFilters() {
  document.getElementById('filterPlatform').value = 'ALL';
  document.getElementById('filterCategory').value = 'ALL';
  document.getElementById('filterZone').value = 'ALL';
  document.getElementById('filterDefect').value = 'ALL';
  document.getElementById('filterRating').value = 'ALL';
  document.getElementById('filterSearch').value = '';
  applyFilters();
}

function updateUI() {
  const count = filteredData.length;
  const totalCount = ALL_DATA.length;
  const pct = ((count / totalCount) * 100).toFixed(1);

  document.getElementById('activeFilterBadge').innerText = `แสดงผล: ${count} จาก ${totalCount} รายการ (${pct}%)`;

  const emptyState = document.getElementById('emptyState');
  const overviewContent = document.getElementById('tabContent-overview');

  if (count === 0) {
    emptyState.classList.remove('hidden');
    overviewContent.classList.add('hidden');
    updateKPIs(0, 0, 0, 0, 0, 0);
    renderTable();
    return;
  } else {
    emptyState.classList.add('hidden');
    overviewContent.classList.remove('hidden');
  }

  // Calculate KPIs
  const totalRevenue = filteredData.reduce((acc, cur) => acc + cur.Transaction_Revenue_THB, 0);
  const totalUnits = filteredData.reduce((acc, cur) => acc + cur.Order_Qty, 0);
  const totalOrders = count;
  const aov = totalOrders > 0 ? (totalRevenue / totalOrders) : 0;
  const defectCount = filteredData.filter(d => d.Is_Defective === 1).length;
  const defectRate = totalOrders > 0 ? ((defectCount / totalOrders) * 100) : 0;
  const avgRating = totalOrders > 0 ? (filteredData.reduce((acc, cur) => acc + cur.Customer_Review_Rating, 0) / totalOrders) : 0;

  updateKPIs(totalRevenue, totalOrders, totalUnits, aov, defectRate, avgRating);
  renderCharts();
  renderTable();
}

function updateKPIs(revenue, orders, units, aov, defectRate, rating) {
  document.getElementById('kpiRevenue').innerText = '฿' + revenue.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  document.getElementById('kpiOrders').innerText = orders.toLocaleString('th-TH') + ' ออเดอร์';
  document.getElementById('kpiUnits').innerText = units.toLocaleString('th-TH') + ' ชิ้น';
  document.getElementById('kpiAOV').innerText = '฿' + aov.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  document.getElementById('kpiDefect').innerText = defectRate.toFixed(2) + '%';
  document.getElementById('kpiRating').innerText = rating.toFixed(2) + ' / 5.0';
}

// Chart Rendering
function renderCharts() {
  renderTrendChart();
  renderPlatformChart();
  renderProductChart();
  renderWarehouseChart();
  renderEDACharts();
}

function renderTrendChart() {
  const ctx = document.getElementById('trendChart').getContext('2d');
  
  // Aggregate revenue by date (YYYY-MM-DD)
  const dateMap = {};
  for (let i = 1; i <= 30; i++) {
    const dStr = `2026-09-${i.toString().padStart(2, '0')}`;
    dateMap[dStr] = 0;
  }

  filteredData.forEach(item => {
    const d = item.Timestamp.substring(0, 10);
    if (dateMap[d] !== undefined) {
      dateMap[d] += item.Transaction_Revenue_THB;
    }
  });

  const labels = Object.keys(dateMap).map(d => `${parseInt(d.substring(8))} ก.ย.`);
  const data = Object.values(dateMap);

  if (trendChartInstance) trendChartInstance.destroy();

  trendChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'ยอดขายรายวัน (THB)',
        data: data,
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.12)',
        fill: true,
        tension: 0.35,
        borderWidth: 2.5,
        pointRadius: 3,
        pointBackgroundColor: '#1d4ed8'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function(context) {
              return ' ยอดขาย: ฿' + context.parsed.y.toLocaleString('th-TH', { minimumFractionDigits: 2 });
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: value => '฿' + (value >= 1000000 ? (value/1000000).toFixed(1) + 'M' : (value/1000).toFixed(0) + 'k')
          },
          grid: { color: '#f1f5f9' }
        },
        x: { grid: { display: false } }
      }
    }
  });
}

function renderPlatformChart() {
  const ctx = document.getElementById('platformChart').getContext('2d');
  const platMap = { 'Shopee': 0, 'Lazada': 0, 'TikTok Shop': 0, 'Unspecified': 0 };

  filteredData.forEach(item => {
    platMap[item.Platform] = (platMap[item.Platform] || 0) + item.Transaction_Revenue_THB;
  });

  const total = Object.values(platMap).reduce((a, b) => a + b, 0) || 1;
  document.getElementById('shareShopee').innerText = ((platMap['Shopee'] / total) * 100).toFixed(1) + '%';
  document.getElementById('shareLazada').innerText = ((platMap['Lazada'] / total) * 100).toFixed(1) + '%';
  document.getElementById('shareTiktok').innerText = ((platMap['TikTok Shop'] / total) * 100).toFixed(1) + '%';

  if (platformChartInstance) platformChartInstance.destroy();

  platformChartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Shopee', 'Lazada', 'TikTok Shop', 'Unspecified'],
      datasets: [{
        data: [platMap['Shopee'], platMap['Lazada'], platMap['TikTok Shop'], platMap['Unspecified']],
        backgroundColor: ['#f97316', '#0284c7', '#ec4899', '#94a3b8'],
        borderWidth: 2,
        borderColor: '#ffffff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11 } } },
        tooltip: {
          callbacks: {
            label: function(context) {
              const val = context.parsed;
              const pct = ((val / total) * 100).toFixed(1);
              return ` ${context.label}: ฿${val.toLocaleString('th-TH')} (${pct}%)`;
            }
          }
        }
      },
      cutout: '65%'
    }
  });
}

function renderProductChart() {
  const ctx = document.getElementById('productChart').getContext('2d');
  const prodMap = {};

  filteredData.forEach(item => {
    prodMap[item.Raw_Product_Name] = (prodMap[item.Raw_Product_Name] || 0) + item.Transaction_Revenue_THB;
  });

  const sortedProds = Object.keys(prodMap).sort((a, b) => prodMap[b] - prodMap[a]);
  const labels = sortedProds.map(p => p.length > 22 ? p.substring(0, 20) + '...' : p);
  const data = sortedProds.map(p => prodMap[p]);

  if (productChartInstance) productChartInstance.destroy();

  productChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'ยอดขายรวม (THB)',
        data: data,
        backgroundColor: '#4f46e5',
        borderRadius: 6
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: context => ' ฿' + context.parsed.x.toLocaleString('th-TH', { minimumFractionDigits: 2 })
          }
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          ticks: {
            callback: value => '฿' + (value >= 1000000 ? (value/1000000).toFixed(1) + 'M' : (value/1000).toFixed(0) + 'k')
          },
          grid: { color: '#f1f5f9' }
        },
        y: {
          grid: { display: false },
          ticks: { font: { size: 10 } }
        }
      }
    }
  });
}

function renderWarehouseChart() {
  const ctx = document.getElementById('warehouseChart').getContext('2d');
  const zones = ['Zone_A', 'Zone_B', 'Zone_C', 'Zone_D'];
  const normalMap = { Zone_A: 0, Zone_B: 0, Zone_C: 0, Zone_D: 0 };
  const defectMap = { Zone_A: 0, Zone_B: 0, Zone_C: 0, Zone_D: 0 };

  filteredData.forEach(item => {
    if (item.Is_Defective === 1) {
      defectMap[item.Warehouse_Zone] = (defectMap[item.Warehouse_Zone] || 0) + 1;
    } else {
      normalMap[item.Warehouse_Zone] = (normalMap[item.Warehouse_Zone] || 0) + 1;
    }
  });

  if (warehouseChartInstance) warehouseChartInstance.destroy();

  warehouseChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Zone A', 'Zone B', 'Zone C', 'Zone D'],
      datasets: [
        {
          label: 'สินค้าปกติ (Normal)',
          data: zones.map(z => normalMap[z]),
          backgroundColor: '#3b82f6',
          borderRadius: 4
        },
        {
          label: 'สินค้าชำรุด (Defective)',
          data: zones.map(z => defectMap[z]),
          backgroundColor: '#ef4444',
          borderRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { stacked: true, grid: { display: false } },
        y: { stacked: true, beginAtZero: true, grid: { color: '#f1f5f9' } }
      },
      plugins: {
        legend: { position: 'top', labels: { boxWidth: 12, font: { size: 11 } } }
      }
    }
  });
}

function renderEDACharts() {
  const distCtx = document.getElementById('edaDistChart');
  const corrCtx = document.getElementById('edaCorrChart');
  if (!distCtx || !corrCtx) return;

  // Price Distribution Bins (0-10k, 10k-20k, 20k-30k, 30k-40k, 40k+)
  const bins = ['฿3k - ฿10k', '฿10k - ฿20k', '฿20k - ฿30k', '฿30k - ฿40k', '฿40k+'];
  const binCounts = [0, 0, 0, 0, 0];

  filteredData.forEach(item => {
    const p = item.Unit_Price_THB;
    if (p < 10000) binCounts[0]++;
    else if (p < 20000) binCounts[1]++;
    else if (p < 30000) binCounts[2]++;
    else if (p < 40000) binCounts[3]++;
    else binCounts[4]++;
  });

  if (edaDistChartInstance) edaDistChartInstance.destroy();
  edaDistChartInstance = new Chart(distCtx.getContext('2d'), {
    type: 'bar',
    data: {
      labels: bins,
      datasets: [{
        label: 'จำนวนธุรกรรม (ความถี่)',
        data: binCounts,
        backgroundColor: '#8b5cf6',
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, grid: { color: '#f1f5f9' } },
        x: { grid: { display: false } }
      }
    }
  });

  // Delivery Days vs Defect Rate
  const days = [1, 2, 3, 4, 5];
  const dayTotals = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  const dayDefects = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  filteredData.forEach(item => {
    const d = item.Supplier_Delivery_Days;
    if (dayTotals[d] !== undefined) {
      dayTotals[d]++;
      if (item.Is_Defective === 1) dayDefects[d]++;
    }
  });

  const defectRates = days.map(d => dayTotals[d] > 0 ? ((dayDefects[d] / dayTotals[d]) * 100).toFixed(1) : 0);

  if (edaCorrChartInstance) edaCorrChartInstance.destroy();
  edaCorrChartInstance = new Chart(corrCtx.getContext('2d'), {
    type: 'line',
    data: {
      labels: days.map(d => `${d} วัน`),
      datasets: [{
        label: 'อัตรา Defect (%)',
        data: defectRates,
        borderColor: '#e11d48',
        backgroundColor: 'rgba(225, 29, 72, 0.1)',
        fill: true,
        tension: 0.3,
        borderWidth: 2,
        pointRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: { callback: v => v + '%' },
          grid: { color: '#f1f5f9' }
        },
        x: { grid: { display: false } }
      }
    }
  });
}

// Table Sorting & Rendering
function sortTable(column) {
  if (currentSortColumn === column) {
    currentSortAsc = !currentSortAsc;
  } else {
    currentSortColumn = column;
    currentSortAsc = true;
  }

  filteredData.sort((a, b) => {
    let valA = a[column];
    let valB = b[column];

    if (typeof valA === 'string') {
      return currentSortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
    } else {
      return currentSortAsc ? valA - valB : valB - valA;
    }
  });

  renderTable();
}

function renderTable() {
  const tbody = document.getElementById('transactionTableBody');
  tbody.innerHTML = '';

  const total = filteredData.length;
  if (total === 0) {
    document.getElementById('tableRecordCount').innerText = '0 รายการ';
    return;
  }

  const effectivePageSize = pageSize === 'all' ? total : parseInt(pageSize);
  const totalPages = Math.ceil(total / effectivePageSize);
  if (currentPage > totalPages) currentPage = totalPages;

  const startIdx = (currentPage - 1) * effectivePageSize;
  const endIdx = Math.min(startIdx + effectivePageSize, total);

  document.getElementById('tableRecordCount').innerText = `แสดง ${startIdx + 1} - ${endIdx} จาก ${total} รายการ`;
  document.getElementById('pageIndicator').innerText = `หน้า ${currentPage} จาก ${totalPages || 1}`;

  document.getElementById('btnPrevPage').disabled = (currentPage <= 1);
  document.getElementById('btnNextPage').disabled = (currentPage >= totalPages);

  const pageItems = filteredData.slice(startIdx, endIdx);

  pageItems.forEach(item => {
    const tr = document.createElement('tr');
    tr.className = 'hover:bg-slate-50 transition border-b border-slate-100';

    const defectBadge = item.Is_Defective === 1
      ? '<span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-100 text-rose-800">ชำรุด (1)</span>'
      : '<span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">ปกติ (0)</span>';

    const platformBadgeClass = item.Platform === 'Shopee' ? 'bg-amber-100 text-amber-800'
      : item.Platform === 'Lazada' ? 'bg-sky-100 text-sky-800'
      : item.Platform === 'TikTok Shop' ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-800';

    tr.innerHTML = `
      <td class="py-2.5 px-3 font-mono font-medium text-blue-600">${item.Transaction_ID}</td>
      <td class="py-2.5 px-3 text-slate-500 text-[11px] whitespace-nowrap">${item.Timestamp}</td>
      <td class="py-2.5 px-3"><span class="px-2 py-0.5 rounded text-[10px] font-semibold ${platformBadgeClass}">${item.Platform}</span></td>
      <td class="py-2.5 px-3 font-medium text-slate-900">${item.Raw_Product_Name}</td>
      <td class="py-2.5 px-3 text-slate-600 text-[11px]">${item.Harmonized_Category}</td>
      <td class="py-2.5 px-3 text-right font-mono font-medium">${item.Order_Qty}</td>
      <td class="py-2.5 px-3 text-right font-mono text-slate-600">฿${item.Unit_Price_THB.toLocaleString('th-TH', { minimumFractionDigits: 2 })}</td>
      <td class="py-2.5 px-3 text-right font-mono font-bold text-slate-900">฿${item.Transaction_Revenue_THB.toLocaleString('th-TH', { minimumFractionDigits: 2 })}</td>
      <td class="py-2.5 px-3 text-center">${defectBadge}</td>
      <td class="py-2.5 px-3 text-center font-semibold text-amber-600">★ ${item.Customer_Review_Rating.toFixed(1)}</td>
      <td class="py-2.5 px-3 text-slate-600 font-mono text-[11px]">${item.Warehouse_Zone}</td>
    `;
    tbody.appendChild(tr);
  });
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    renderTable();
  }
}

function nextPage() {
  const effectivePageSize = pageSize === 'all' ? filteredData.length : parseInt(pageSize);
  const totalPages = Math.ceil(filteredData.length / effectivePageSize);
  if (currentPage < totalPages) {
    currentPage++;
    renderTable();
  }
}

function changePageSize() {
  pageSize = document.getElementById('pageSizeSelect').value;
  currentPage = 1;
  renderTable();
}

// Tab Switching
function switchTab(tabId) {
  const tabs = ['overview', 'audit', 'eda', 'insights', 'dictionary', 'explorer'];
  tabs.forEach(t => {
    const btn = document.getElementById(`tabBtn-${t}`);
    const content = document.getElementById(`tabContent-${t}`);
    if (t === tabId) {
      btn.className = 'tab-btn active px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition bg-blue-600 text-white shadow-sm flex items-center';
      content.classList.remove('hidden');
    } else {
      btn.className = 'tab-btn px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 flex items-center';
      content.classList.add('hidden');
    }
  });

  if (tabId === 'overview') {
    setTimeout(renderCharts, 50);
  } else if (tabId === 'eda') {
    setTimeout(renderEDACharts, 50);
  } else if (tabId === 'explorer') {
    renderTable();
  }
}

// Modal
function openUserGuideModal() {
  document.getElementById('userGuideModal').classList.remove('hidden');
}

function closeUserGuideModal() {
  document.getElementById('userGuideModal').classList.add('hidden');
}

// Export CSV
function exportToCSV() {
  let csv = 'Timestamp,Transaction_ID,Platform,Raw_Product_Name,Harmonized_Category,Order_Qty,Unit_Price_THB,Transaction_Revenue_THB,Is_Defective,Customer_Review_Rating,Product_Record_ID,Warehouse_Zone,System_IP_Node,Days_Listed_In_Catalog,Estimated_Shipping_Cost,Supplier_Delivery_Days\n';
  
  filteredData.forEach(item => {
    const row = [
      `"${item.Timestamp}"`,
      `"${item.Transaction_ID}"`,
      `"${item.Platform}"`,
      `"${item.Raw_Product_Name}"`,
      `"${item.Harmonized_Category}"`,
      item.Order_Qty,
      item.Unit_Price_THB,
      item.Transaction_Revenue_THB,
      item.Is_Defective,
      item.Customer_Review_Rating,
      `"${item.Product_Record_ID}"`,
      `"${item.Warehouse_Zone}"`,
      `"${item.System_IP_Node}"`,
      item.Days_Listed_In_Catalog,
      item.Estimated_Shipping_Cost,
      item.Supplier_Delivery_Days
    ];
    csv += row.join(',') + '\n';
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `ecommerce_cleaned_export_${new Date().toISOString().substring(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Copy Python Code
function copyPythonCode() {
  const code = document.getElementById('pythonPipelineCode').innerText;
  navigator.clipboard.writeText(code).then(() => {
    alert('คัดลอกโค้ด Python เรียบร้อยแล้ว!');
  }).catch(() => {
    alert('ไม่สามารถคัดลอกโค้ดได้ กรุณาคัดลอกด้วยตนเอง');
  });
}
