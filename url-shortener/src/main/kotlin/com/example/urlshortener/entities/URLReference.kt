package com.example.urlshortener.entities

import java.time.LocalDateTime
import javax.persistence.*


@Entity
@Table(name = "url_reference")
class URLReference(
    @Id @GeneratedValue(strategy = GenerationType.AUTO) @Column(name = "ID")
    val id: Long? = null,
    @Column(name = "ORIGINAL_URL", nullable = false) val originalURL: String,
    @Column(name = "URL_HASH", unique = true, nullable = false) val URLHash: String,
    @Column(
        name = "CREATED_AT",
        nullable = false,
    ) val createdAt: LocalDateTime = LocalDateTime.now(),
)
