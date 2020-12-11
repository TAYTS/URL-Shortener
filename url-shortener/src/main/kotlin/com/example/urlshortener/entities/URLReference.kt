package com.example.urlshortener.entities

import com.fasterxml.jackson.annotation.JsonProperty
import io.swagger.v3.oas.annotations.media.Schema
import java.time.LocalDateTime
import javax.persistence.*


@Entity
@Table(name = "url_reference")
class URLReference(
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID")
    @Schema(example = "1")
    val id: Long? = null,
    @Column(name = "ORIGINAL_URL", nullable = false)
    @Schema(example = "http://www.google.com")
    val originalURL: String,
    @Column(name = "URL_HASH", unique = true, nullable = false)
    @Schema(example = "7206CD9F7E31B4B")
    @get:JsonProperty("URLHash")
    val URLHash: String,
    @Column(
        name = "CREATED_AT",
        nullable = false,
    ) val createdAt: LocalDateTime = LocalDateTime.now(),
)
