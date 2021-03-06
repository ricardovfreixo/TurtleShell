import { SIGN_TYPE } from "@turtlenetwork/signature-adapter";
import { Asset, Money } from "@turtlenetwork/data-entities";

export const messageType = "issue";
export const txType = "transaction";

export function getAssetsId(tx): Array<string> {
  const feeAssetId =
    tx.fee && tx.fee.assetId ? tx.fee.assetId : tx.feeAssetId || "TN";
  const amountAssetId =
    tx.amount && tx.amount.assetId ? tx.amount.assetId : tx.assetId || "TN";

  if (feeAssetId === amountAssetId) {
    return [amountAssetId];
  }

  return [amountAssetId, feeAssetId];
}

export function getFee(tx) {
  return typeof tx.fee === "object" ? tx.fee : { coins: tx.fee, assetId: "TN" };
}

export function getAmount(tx = null) {
  return new Money(
    tx.quantity,
    new Asset({
      ...tx,
      precision: Number(tx.precision) || 0
    })
  );
}

export function getAmountSign() {
  return "+";
}

export function isMe(tx: any, type: string) {
  return tx.type === SIGN_TYPE.ISSUE && type === txType;
}
