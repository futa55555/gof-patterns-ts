# patterns/01 review

## 今回の問題点

- 画面数が増えるほど `if / else` が増え、遷移ロジックの見通しが悪化していた
- 1つの Controller に以下が混在していた
  - 画面遷移
  - 入力バリデーション
  - API送信
  - リトライ制御
  - UIアクション（閉じる、履歴遷移）
- 状態遷移の規則が散在し、変更時に副作用が読みにくかった
- 例外時の更新（`errorMessage`、`retryCount`）が局所化されておらず、保守コストが高かった

## どう解決するべきだったか

- 画面ごとの振る舞いを `XxxHandler` に分割し、責務を画面単位に閉じ込める
- `ScreenHandler` という共通契約を定義し、全画面の呼び出し形を統一する
- Controller は次の2つに責務を限定する
  - 現在の画面に対応する handler を選ぶ
  - handler の結果を state と action に適用する
- 可変状態（`ctx`）と固定依存（`deps`）を分離する
  - `ctx`: 呼び出しごとに変わるフォーム値やリトライ回数
  - `deps`: API送信、価格計算、トラッキングなどの外部依存
- handler の戻り値を `HandlerResult` に統一し、`void` を排除する
  - 何が起きるか（次画面、UIアクション、エラー情報）を明示できる

## 今回の refactored 実装の要点

- `patterns/01/attempt-refactored/main.ts`
  - Controller を薄くし、`getContext` + `applyResult` で処理を一元化
- `patterns/01/attempt-refactored/handlers/*`
  - 画面単位の判断・遷移を各 handler に分離
- `patterns/01/attempt-refactored/services/*`
  - トラッキング、価格計算、注文送信を外部依存として分離

## 実務での運用ポイント

- まず「増え続ける分岐」を検知し、分割単位を画面/状態で決める
- 分割後は「契約（interface）」を先に固める
- Controller に業務ロジックを戻さない（戻ると再び肥大化する）
