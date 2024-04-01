<p align="center">
    <img src="icon.png" height="160">
    <h1 align="center">AtCoder API</h1>
    <p align="center">開催予定のコンテストを取得する非公式APIです</p>
</p>

## About
AtCoder株式会社が開催するプログラミングコンテスト[AtCoder](https://atcoder.jp)の開催予定のコンテストの情報を取得することができる非公式APIです。

情報は30分毎に更新され, durationは1秒間隔で更新されます。

デプロイ先はRailwayです。

## How to use
GETメソッドを使用し、JSON形式のコンテスト情報を得ることができます。
### エンドポイント
| データ                                     | エンドポイント                                                              |
| ------------------------------------------ | --------------------------------------------------------------------------- |
| 開催予定となっているコンテスト一覧         | https://atcoderapi-production.up.railway.app/api/upcoming-contests          |
| 開催予定となっているBeginnerコンテスト一覧 | https://atcoderapi-production.up.railway.app/api/upcoming-contests/ABC      |
| 最も早く開催される次回のコンテスト         | https://atcoderapi-production.up.railway.app/api/upcoming-contests/next     |
| 最も早く開催される次回のBeginnerコンテスト | https://atcoderapi-production.up.railway.app/api/upcoming-contests/ABC/next |


## Example
### GETによるJSONの例
```JSON
[
    {
        "time": "2024-04-06 21:00:00",
        "title": "Toyota Programming Contest 2024#4（AtCoder Beginner Contest 348）",
        "link": "https://atcoder.jp/contests/abc348?lang=en",
        "unixTime": 1712462400000,
        "duration": 474395
    },
]
```
### 項目と概要
| 項目      | 概要                                       |
| --------- | ------------------------------------------ |
| time      | 開催時刻を日本標準時で提供します。         |
| title     | コンテストのタイトルを提供します。         |
| link      | コンテストのリンクを提供します。           |
| unixTime  | 開催時刻をUNIX時間形式で提供します。(日本標準時) |
| duration  | コンテスト開催までの残り時間を秒数で提供します。 |


## Warning
- デプロイ先は予告なく変更される場合があり, URLを使用しているプログラムに影響を及ぼす可能性があります。
- 制作者はコーディング初学者です。誤りを見つけられましたら、お気軽にご指摘ください。
