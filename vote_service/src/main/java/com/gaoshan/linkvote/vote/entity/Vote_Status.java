package com.gaoshan.linkvote.vote.entity;

public enum Vote_Status {
    /**
     * 初始化创建 - 未上链
     */
    CREATE("0"),
    /**
     * 等待交易确认
     */
    WAIT_CONFIRM("9"),
    /**
     * 交易成功
     */
    TX_SUCCESS("1"),
    /**
     * 交易失败
     */
    TX_FAIL("2"),
    /**
     * 进行中
     */
    ING("3"),
    /**
     * 已结束
     */
    ENDED("4");

    private String code;

    Vote_Status(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
