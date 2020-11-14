package com.javaweb.newswebsite.dto;

public class CmtDTO extends AbstractDTO<CmtDTO>{
	private String content;
	private String status;
	private Long newId;
	
	
	public Long getNewId() {
		return newId;
	}
	public void setNewId(Long newId) {
		this.newId = newId;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
}
