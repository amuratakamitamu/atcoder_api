<p align="center">
    <img src="icon.png" height="160">
    <h1 align="center">AtCoder API</h1>
    <p align="center">開催予定のコンテストを取得する非公式APIです</p>
</p>

## About
AtCoder株式会社が開催するプログラミングコンテスト[AtCoder](https://atcoder.jp)の開催予定のコンテストの情報を取得することができる非公式APIです。

情報は5分毎に更新されます。

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

## Warning
- デプロイ先は予告なく変更される場合があります。
- GitHub該当リポジトリに適応されているライセンスに基づいて使用してください。
