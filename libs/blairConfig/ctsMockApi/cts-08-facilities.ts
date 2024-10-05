export default {
  data: {
    facilitiesList: [
      {
        facilities_title: "台北市立天文科學教育館",
        facilities_description:
          "位於臺灣臺北市士林區的臺北科學藝術園區內，為臺北市政府教育局所屬之社會教育機構，成立於1996年11月7日。",
        facilities_image: "/img/facilities-bg-01.jpg",
        facilities_link: "https://www.tam.gov.taipei/",
        __typename: "Facility",
      },
      {
        facilities_title: "南瀛天文教育園區",
        facilities_description:
          "位於台南市大內區的天文教育館，原為台南縣政府以天文推廣教育為主要目的而設立的「南瀛天文教育園區」。",
        facilities_image: "/img/facilities-bg-02.jpg",
        facilities_link: "https://taea.tn.edu.tw/",
        __typename: "Facility",
      },
      {
        facilities_title: "國立自然科學博物館",
        facilities_description:
          "簡稱科博館，是位於臺灣臺中市北區的公立科學博物館，是中華民國國家十二項建設文化建設項下興建的首座科學博物館。",
        facilities_image: "/img/facilities-bg-03.jpg",
        facilities_link: "https://www.nmns.edu.tw/ch/",
        __typename: "Facility",
      },
    ],
    observatoriesList: [
      {
        observatory_category_name: "研究及學術",
        observatory_category_id: "research",
        observatory_post_content: `| 名稱               | 口徑                | 廠牌                                                                       | 赤道儀                            | 圓頂直徑              |\n|------------------|-------------------|--------------------------------------------------------------------------|--------------------------------|-------------------|\n| 國立中央大學天文台        | 61.0 cm           | Perkin-Elmer 蓋賽格林鏡                                                       | 德式赤道儀                          | 6.5 m             |\n| 國立中央大學天文台        | 40.0 cm           | Meade-16                                                                 | 電腦經緯儀                          | 6.0 m 八角頂         |\n| 國立中央大學鹿林天文台      | 100.0 cm          | APM蓋賽格林鏡                                                                 | 叉式赤道儀                          | 10.0 m 八角頂        |\n| 國立中央大學鹿林天文台      | 50.0 cm (x4)      | Torus Precision Optics                                                   | 叉式赤道儀(x4)                      | 平頂式(x4)           |\n| 國立中央大學鹿林天文台      | 40.0 cm           | RCOS                                                                     | 德式赤道儀                          | 6.0 m 八角頂         |\n| 國立中央大學鹿林天文台      | 35.0 cm           | Celestron (C-14)                                                         | 德式赤道儀                          | 3.0 m             |\n| 國立中央大學鹿林天文台      | 200 cm(計劃取消)      | 西村RC                                                                     | 電腦經緯儀                          |                   |\n| 國立台灣大學墾丁天文台      | 30.0 cm           | Officina StellareRH Veloce 300                                           | ASA DDM85 Premium              | Sirius 3.5m       |\n| 國立台灣大學墾丁天文台      | 35.0 cm           | Celestron 14" CGE                                                        | Software BisqueParamount ME II | Astro Heaven 3.5m |\n| 國立台灣大學鳳凰山天文台     | 63.5 cm           | PGS                                                                      | 叉式赤道儀                          | 5.0 m             |\n| 國立台灣師範大學地球科學系天文台 | 40.0 cm           | Torus CC40                                                               | 叉式赤道儀                          | 4.0 m             |\n| 國立台灣師範大學地球科學系天文台 | 40.0 cm           | RCOS RC-16                                                               | Paramount ME                   | 平頂式               |\n| 國立台灣師範大學地球科學系天文台 | 36.0 cm           | Celestron (C-14)                                                         | Losmandy Gemini                | 平頂式               |\n| 國立台灣師範大學地球科學系天文台 | 10.2 cm           | TAKAHASHI FS-102                                                         | TAKAHASHI EM200                | 平頂式               |\n| 國立台灣師範大學地球科學系天文台 | 15.0 cm           | GOTO+Hα濾鏡                                                                | 德式赤道儀                          | 4.0 m             |\n| 中正理工學院中正天文台      | 30.0 cm           | NIKON                                                                    | 德式赤道儀                          | 6.0 m             |\n| 國立清華大學物理系        | 25.0 cm           | SHOWA                                                                    | 德式赤道儀                          |                   |\n| 國立清華大學物理系        |                   | QUASTAR                                                                  | NJP赤道儀                         |                   |\n| 私立修平科技大學太陽觀測站HSO | 35.56 cm          | Meade LX200GPS 14" (Fail operating due to 2017 Nesat Damage (Code 1709)) | 電腦經緯儀                          | 2.1 m             |\n| 國立成功大學天文台        | 35.0 cm           | Celestron                                                                | Astrophysics EQ1200赤道儀         | 平頂式               |\n| 國立成功大學天文台        | 10.5 cm           | William Optics FLT                                                       |                                |                   |\n| 私立中原大學天文台        | 30.0 cm + 10.3 cm | Meade + William Optics Zenithstar                                        | iOptron CEM120EC               | 6.0 m             |\n| 私立中原大學天文台        | 10.5 cm           | William Optics FLT                                                       | Losmandy GM-8                  |                   |\n| 交通部中央氣象局天文台      | 15.0 cm           | GOTO                                                                     | 德式赤道儀                          | 4.5 m             |`,
        __typename: "Observatory",
      },
      {
        observatory_category_name: "教育單位",
        observatory_category_id: "education",
        observatory_post_content: `| 名稱             | 口徑      | 廠牌                | 赤道儀                              | 圓頂直徑  |\n|----------------|---------|-------------------|----------------------------------|-------|\n| 嘉義市蘭潭國民小學      | 20.0 cm | 南京天儀中心            | 德式赤道儀                            | 6.0 m |\n| 彰化縣立彰興國民中學     | 18.0 cm | Astrophysics EDT  | SHOWA德式赤道儀                       | 3.0 m |\n| 彰化縣彰化市平和國民小學   | 12.5 cm | TAKAHASHI         | 德式赤道儀                            | 3.0 m |\n| 臺中市立惠文高級中學天文台  | 43.2 cm | PlaneWave CDK 17" | 德式赤道儀 Paramount ME II            | 6.5m  |\n| 臺中市私立明道高級中學天文館 | 31.8 cm | Meade LX200       | 叉式赤道儀                            | 4.0 m |\n| 臺中市潭子區潭陽國民小學   | 12.8 cm | TAKAHASHI         | 德式赤道儀                            | 3.0 m |\n| 臺北市內湖區南湖國民小學   | 30.0 cm | 高橋μ300            | EM500赤道儀                         | 3.0 m |\n| 臺北市立中崙高級中學     | 15.2 cm | Meade LXD55       | Meade赤道儀                         |       |\n| 臺北市立天文科學教育館    | 45.0 cm | GOTO蓋賽格林鏡         | 德式赤道儀                            | 6.0 m |\n| 臺北市立天文科學教育館    | 20.0 cm | GOTO 庫德鏡          | 德式赤道儀                            | 6.0 m |\n| 臺北市立天文科學教育館    | 15.0 cm | SHOWA 折射鏡         | 德式赤道儀                            |       |\n| 臺北市立天文科學教育館    | 12.5 cm | GOTO MX II        | 德式赤道儀                            |       |\n| 臺北市立南湖高級中學     | 30.5 cm | Meade 史密特·蓋賽格林鏡   | 經緯儀含Autostar, 自動導入系統與, GPS全球定位系統 |       |\n| 臺北市立桃源國民中學     | 12.5 cm | TAKAHASHI         | 德式赤道儀                            | 3.0 m |\n| 臺北市立第一女子高級中學   | 10.0 cm | 高橋 EM-500         | 四管太陽鏡                            | 3.0 m |\n| 臺北市立麗山高級中學     | 15.2 cm | 高橋 FS152          | 德式赤道儀                            | 3.0 m |\n| 臺北城市科技大學       | 20.0 cm | Celestron(C-8)    | 赤道儀                              | 2.5 m |\n| 臺南市南瀛天文教育園區    | 76.2 cm | Astronomical      | 叉式赤道儀                            | 8.0m  |\n| 臺南市南瀛天文教育園區    | 30.0 cm | Meade-12          |                                  |       |\n| 臺南市南瀛天文教育園區    | 25.0 cm | BRC-250           |                                  |       |\n| 澎湖縣立文化中心       | 15.0 cm | GOTO              | 德式赤道儀                            | 4.0 m |`,
        __typename: "Observatory",
      },
      {
        observatory_category_name: "其他單位",
        observatory_category_id: "otherunit",
        observatory_post_content: `| 名稱                  | 口徑           | 廠牌              | 赤道儀    | 圓頂直徑  |\n|---------------------|--------------|-----------------|--------|-------|\n| 天鵝湖大飯店天文台（墾丁）       | 35.0 cm      | Celestron(C-14) | 德式赤道儀  | 3.0 m |\n| 竹北新豐教會天文台           | 30.5 cm      | Meade LX200     | 叉式赤道儀  |       |\n| 私立安國天文台（獅頭山）        | 25.4 cm      | Meade LX50      | 叉式赤道儀  | 2.5 m |\n| 中信大飯店天文台（日月潭）       | 25.0 cm      | Meade LX200     | 叉式赤道儀  |       |\n| 墾丁關山蓮莊              | 15.0 cm      | Celestron       | 德式赤道儀  |       |\n| 私立文山天文觀測所（新店）       | 12.5 cm      | GOTO MX II      | 德式赤道儀  | 2.5 m |\n| 國語日報社天文台（台北市）       | 8.0 cm       | Vixen GP        | 德式赤道儀  | 2.5 m |\n| 新竹德蘭中心天文館（新竹縣）      | 11.0 cm      | 萬駿              | dob杜普森 | 3 m   |\n| 大熊天文台（楊梅）           | 13.0 cm      | NJP Temma2      | 德式赤道儀  | 平頂    |\n| AAVSO TYGA TW 大溪天文台 | 35.5 cm F 11 | Showa20E(Kai)   | 德式赤道儀  | 電動平頂  |\n| cuteip天文台 （彰化）      | 25.0 cm      | paramount MX    | 德式赤道儀  | 平頂    |`,
        __typename: "Observatory",
      },
    ],
  },
};
